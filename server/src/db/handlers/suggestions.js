import { SuggestionModel, UserModel } from '../models';
import MailSender from '../../communication/MailSender';
import { newSuggestionHTML } from '../../communication/templates'
import log from '../../lib/logger';

const flatten = arr => arr.reduce((flat, a) => { return [...flat, ...a]; }, []);

function addSuggestion(name, description) {
  const model = new SuggestionModel({ name, description });

  return model
  .save()
  .then(reply => {
    //do this async
    UserModel
    .find({}, { emails: 1 })
    .then(addresses => {
      new MailSender({
        to: flatten(addresses.map(a => a.emails)),
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

function getSuggestions() {
  return SuggestionModel.find();
}

function voteOnSuggestion(suggestionId) {
  return SuggestionModel
    .findOne({ _id: suggestionId })
    .then(suggestion => {
      if (suggestion === null) {
        throw new Error(`Voting failed: suggesiont Id(${suggestionId}) was not found.`);
      }

      if (suggestion.voting.stage !== 'LISTED') {
        throw new Error(`Voting failed: suggesiont Id(${suggestionId}) wrong stage(${suggestion.voting.stage}).`);
      }

      return SuggestionModel.findOneAndUpdate(
        { _id: suggestionId },
        { $inc: { 'voting.num_of_votes': 1 } },
        { new: true },
      );

    })
}

export {
  addSuggestion,
  getSuggestions,
  voteOnSuggestion,
}
