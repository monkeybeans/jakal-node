import { SuggestionModel } from '../models';
import { getEmailSendList } from './users';
import { checkIfVotingAllowed, updateVotingDate } from './users';
import MailSender from '../../communication/MailSender';
import { newSuggestionHTML } from '../../communication/templates'
import log from '../../lib/logger';
import { rewindDateToDay } from '../../lib/date-calculator';

const senNewSuggestionMail = (name, description) => {
  return getEmailSendList()
  .then(sendList => {
    new MailSender({
      to: sendList,
      subject: `New suggestion: ${name}`,
      html: newSuggestionHTML({ name, description }),
    }).send();
  })
};

export function addDefaultSuggestions() {
  const model = new SuggestionModel({
    name: 'Spara Potten',
    description: 'När marknaden inte lämpar sig för en investering eller när de förslag som finns inte lockar...',
    'submitter.username': 'jakal-bot' }
  );

  return model
  .save();
}

export function addSuggestion(name, description, username) {
  const model = new SuggestionModel({ name, description, 'submitter.username': username });

  return model
  .save()
  .then(reply => {
    //do this async, so we do not delay the main response
    senNewSuggestionMail(name, description)
    .catch(e => {
      log.error('Could not send mail: ', e);
    });

    return reply;
  });
}

export function getFreshSuggestions({ settings, today }) {
  const suggestionStartDate = rewindDateToDay(today, settings.period_suggest_start_day);
  const midnightDate = new Date(suggestionStartDate.year(), suggestionStartDate.month(), suggestionStartDate.date());

  return SuggestionModel
  .find({
    'submitter.time': { $gte: midnightDate },
  });
}

export function voteOnSuggestion({suggestionId, session}) {
  return checkIfVotingAllowed(session)
  .then(eligible => {
    if (eligible === true) {
      return updateVotingDate(session);
    }

    throw new Error(`Voting is not allowed for session: ${session}`)
  })
  .then(() => {
    return SuggestionModel
    .findOne({ _id: suggestionId })
    .then(suggestion => {
      if (suggestion === null) {
        throw new Error(`Voting failed: suggesiont Id(${suggestionId}) was not found.`);
      }

      return SuggestionModel.findOneAndUpdate(
        { _id: suggestionId },
        { $inc: { 'voting.num_of_votes': 1 } },
        { new: true },
      );
    });
  })
}
