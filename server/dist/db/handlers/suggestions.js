'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSuggestion = addSuggestion;
exports.getFreshSuggestions = getFreshSuggestions;
exports.voteOnSuggestion = voteOnSuggestion;

var _models = require('../models');

var _users = require('./users');

var _MailSender = require('../../communication/MailSender');

var _MailSender2 = _interopRequireDefault(_MailSender);

var _templates = require('../../communication/templates');

var _logger = require('../../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _dateCalculator = require('../../lib/date-calculator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const senNewSuggestionMail = (name, description) => {
  return (0, _users.getEmailSendList)().then(sendList => {
    new _MailSender2.default({
      to: sendList,
      subject: `New suggestion: ${name}`,
      html: (0, _templates.newSuggestionHTML)({ name, description })
    }).send();
  });
};

function addSuggestion(name, description) {
  const model = new _models.SuggestionModel({ name, description });

  return model.save().then(reply => {
    //do this async, so we do not delay the main response
    senNewSuggestionMail(name, description).catch(e => {
      _logger2.default.error('Could not send mail: ', e);
    });

    return reply;
  });
}

function getFreshSuggestions({ settings, today }) {
  const suggestionStartDate = (0, _dateCalculator.rewindDateToDay)(today, settings.period_suggest_start_day);

  return _models.SuggestionModel.find({ 'submitter.time': { $gt: suggestionStartDate } });
}

function voteOnSuggestion({ suggestionId, session }) {
  return (0, _users.checkIfVotingAllowed)(session).then(eligible => {
    if (eligible === true) {
      return (0, _users.updateVotingDate)(session);
    }

    throw new Error(`Voting is not allowed for session: ${session}`);
  }).then(() => {
    return _models.SuggestionModel.findOne({ _id: suggestionId }).then(suggestion => {
      if (suggestion === null) {
        throw new Error(`Voting failed: suggesiont Id(${suggestionId}) was not found.`);
      }

      return _models.SuggestionModel.findOneAndUpdate({ _id: suggestionId }, { $inc: { 'voting.num_of_votes': 1 } }, { new: true });
    });
  });
}