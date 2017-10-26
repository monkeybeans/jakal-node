import nodemailer from 'nodemailer';
import log from '../lib/logger';
import { parseArgs, loadSecret } from '../lib/arg-utils';

const argv = parseArgs(process.argv.slice(2));
const secret = loadSecret(argv.secretPath);

export default class MailSender {
  constructor() {
    const { username, password } = secret.mail;

    this.user = username;
    this.pass = password;
    this.options = {
      from: username,
    };
    this.transport = this.createTransport();
  }

  setFrom(from) { this.options.from = from; return this; }
  setTo(to) { this.options.to = to; return this; }
  setSubject (subject) { this.options.subject = subject; return this; }
  setText(text) { this.options.text = text; return this; }
  setHtml(html) { this.options.html = html; return this; }

  createTransport() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.user,
        pass: this.pass,
      }
    })
  }

  send() {
    if (process.NODE_ENV === 'production') {
      this.transporter.sendMail(
        this.options,
        (error, info) => {
          if (error) {
            log.error(error);
          } else {
            log(`Mail sent: <<${this.options.subject}>> ${info.envelope}`);
          }
        });
    } else {
      log(`Mail disabled for ${process.NODE_ENV}, but would have sent: ${this.optionsto}`);
    }
  }
}
