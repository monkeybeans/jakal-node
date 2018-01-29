import nodemailer from 'nodemailer';
import log from '../lib/logger';
import { parseArgs, loadSecret, isProduction, isTest } from '../lib/arg-utils';

const argv = parseArgs(process.argv.slice(2));
const secret = loadSecret(argv.secretsPath || process.env.SECRETS_PATH);

export default class MailSender {
  constructor({ to, subject, text, html, from }) {
    const { username, password } = secret.mail || {};

    this.user = username;
    this.pass = password;
    this.options = {
      from: from || username,
      to,
      subject: `[jakal] ${subject}`,
      text,
      html,
    };

    this.transporter = this.createTransport();
  }

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
    if (isProduction()) {
      this.transporter.sendMail(
        this.options,
        (error, info) => {
          if (error) {
            log.error(error);
          } else {
            log(`Mail sent: <<${this.options.subject}>> <<${info.envelope.to}>>`);
          }
        });
    } else if (!isTest()) {
      log(`Mail disabled for ${process.env.NODE_ENV}, but would have sent: ${JSON.stringify(this.options, null, 2)}`);
    }
  }
}
