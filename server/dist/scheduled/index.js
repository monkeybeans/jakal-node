'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actUponPeriodChange = exports.actUponPeriodChangeSchedule = undefined;

var _cron = require('cron');

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

var _periodCalculator = require('../lib/period-calculator');

var _PeriodType = require('../../../shared/types/PeriodType');

var _PeriodType2 = _interopRequireDefault(_PeriodType);

var _votingUtils = require('../db/handlers/voting-utils');

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _MailSender = require('../communication/MailSender');

var _MailSender2 = _interopRequireDefault(_MailSender);

var _suggestions = require('../db/handlers/suggestions');

var _users = require('../db/handlers/users');

var _templates = require('../communication/templates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TIME_ZONE = 'Europe/Berlin';

const sendMailSuggest = () => (0, _users.getEmailSendList)().then(sendList => {
  const mail = new _MailSender2.default({
    to: sendList,
    subject: 'Voting has started',
    html: (0, _templates.suggestionBeginHTML)()
  });

  mail.send();
});

const sendMailVote = () => {
  const sendMail = sendList => (0, _suggestions.getListedSuggestions)().then(listed => {
    const mail = new _MailSender2.default({
      to: sendList,
      subject: 'Voting has started',
      html: (0, _templates.votingBeginHTML)({ suggestions: listed })
    });

    mail.send();
  });

  return (0, _users.getEmailSendList)().then(sendMail);
};

const sendMailDisplay = () => {
  const sendMail = sendList => {
    return (0, _suggestions.getFreshSuggestions)({ settings: _settings2.default, today: new Date() }).then(fresh => {
      const freshEndorsed = fresh.filter(s => s.voting.is_endorsed);

      if (freshEndorsed.length <= 1) {
        const mail = new _MailSender2.default({
          to: sendList,
          subject: 'Voting is finished',
          html: (0, _templates.votingFinishHTML)({ suggestion: freshEndorsed[0] })
        });

        mail.send();
      } else {
        throw new Error(`More then one endorsed suggestion found: ${freshEndorsed}`);
      }
    });
  };

  return (0, _users.getEmailSendList)().then(sendMail);
};

const actUponPeriodChange = () => {
  const {
    days_to_next_period,
    elapsed_period_days,
    period
  } = (0, _periodCalculator.calculatePeriodState)({ today: new Date(), settings: _settings2.default });

  (0, _logger2.default)(`Checking period: ${period}, elapsed days: ${elapsed_period_days}, next period in days: ${days_to_next_period}`);

  // SUGGEST
  if (period === _PeriodType2.default.SUGGEST) {
    if (elapsed_period_days === 0) {
      sendMailSuggest().catch(e => _logger2.default.error(`Could not mail for period ${period}: `, e));
    }
  }
  // VOTE
  else if (period === _PeriodType2.default.VOTE) {
      if (elapsed_period_days === 0) {
        sendMailVote().catch(e => _logger2.default.error(`Could not mail for period ${period}: `, e));
      }
    }
    // DISPLAY
    else if (period === _PeriodType2.default.DISPLAY) {
        if (elapsed_period_days === 0) {
          (0, _votingUtils.resolveEndorsedInPeriod)({ settings: _settings2.default, today: new Date() }).then(sendMailDisplay).catch(e => _logger2.default.error(`Could not mail for period ${period}: `, e));
        }
      } else {
        throw new Error('Could not descide period');
      }
};

const actUponPeriodChangeSchedule = new _cron.CronJob({
  cronTime: '00 00 02 * * *',
  onTick: actUponPeriodChange,
  startNow: false,
  runOnInit: false,
  timeZone: TIME_ZONE
});

exports.actUponPeriodChangeSchedule = actUponPeriodChangeSchedule;
exports.actUponPeriodChange = actUponPeriodChange;