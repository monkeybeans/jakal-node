'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _argUtils = require('../lib/arg-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const argv = (0, _argUtils.parseArgs)(process.argv.slice(2));
const secret = (0, _argUtils.loadSecret)(argv.secretPath);

class MailSender {
  constructor({ to, subject, text, html, from }) {
    const { username, password } = secret.mail || {};

    this.user = username;
    this.pass = password;
    this.options = {
      from: from || username,
      to,
      subject: `[jakal] ${subject}`,
      text,
      html
    };

    this.transporter = this.createTransport();
  }

  createTransport() {
    return _nodemailer2.default.createTransport({
      service: 'gmail',
      auth: {
        user: this.user,
        pass: this.pass
      }
    });
  }

  send() {
    if ((0, _argUtils.isProduction)()) {
      this.transporter.sendMail(this.options, (error, info) => {
        if (error) {
          _logger2.default.error(error);
        } else {
          (0, _logger2.default)(`Mail sent: <<${this.options.subject}>> <<${info.envelope.to}>>`);
        }
      });
    } else if (!(0, _argUtils.isTest)()) {
      (0, _logger2.default)(`Mail disabled for ${process.env.NODE_ENV}, but would have sent: ${JSON.stringify(this.options, null, 2)}`);
    }
  }
}
exports.default = MailSender;