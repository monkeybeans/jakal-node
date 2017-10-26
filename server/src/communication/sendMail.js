import nodemailer from 'nodemailer';
import log from '../lib/logger';

export default function sendMail(user, pass, mailConfig) {
  const mailOptions = {
    from: user,
    to: ['mber02@kth.se'],
    subject: 'Test of mail client',
    text: 'some body text',
    //html: '<b>text</b>',
  };

  const transporter = nodemailer.createTransport({
    service: 'Gmail', // no need to set host or port etc.
    auth: {
      user,
      pass,
    }
  });


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      log.error(error);
    } else {
      log(`Mail sent: <<${mailOptions.subject}>> ${info.envelope}`);
    }
  });
}
