import { SuggestionModel } from '../models';
import { getEmailSendList } from './users';
import MailSender from '../../communication/MailSender';
import { newSuggestionHTML } from '../../communication/templates'
import log from '../../lib/logger';

export function addSuggestion(name, description) {
  const model = new SuggestionModel({ name, description });

  return model
  .save()
  .then(reply => {
    //do this async
    getEmailSendList()
    .then(sendList => {
      new MailSender({
        to: sendList,
        subject: `New suggestion: ${name}`,
        html: newSuggestionHTML({ name, description }),
      }).send();
    })
    .catch(e => {
      log.error('Could not send mail: ', e);
    });

    return reply;
  });
}

export function getListedSuggestions() {
  return SuggestionModel.find({ 'voting.condition': 'LISTED'});
}

export function voteOnSuggestion(suggestionId) {
  return SuggestionModel
    .findOne({ _id: suggestionId })
    .then(suggestion => {
      if (suggestion === null) {
        throw new Error(`Voting failed: suggesiont Id(${suggestionId}) was not found.`);
      }

      if (suggestion.voting.condition !== 'LISTED') {
        throw new Error(`Voting failed: suggesiont Id(${suggestionId}) wrong condition (${suggestion.voting.condition}).`);
      }

      return SuggestionModel.findOneAndUpdate(
        { _id: suggestionId },
        { $inc: { 'voting.num_of_votes': 1 } },
        { new: true },
      );
    })
}

export function getEndorsedSuggestions(limit = 50) {
  return SuggestionModel
  .find({ 'voting.condition': 'ENDORSED' })
  .sort('-submitter.time')
  .limit(limit);
}
