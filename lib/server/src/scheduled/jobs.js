import settings from '../settings';
import PeriodType from '../../../shared/types/PeriodType';
import {
  resolveEndorsedInPeriod } from '../db/handlers/voting-utils';
import log from '../lib/logger';
import {
  getEmailSendList,
  getUsersNotVoted } from '../db/handlers/users';
import {
  addDefaultSuggestions,
  getFreshSuggestions,
} from '../db/handlers/suggestions';
import {
  sendMailSuggest,
  sendMailVote,
  sendMailDisplay,
  sendMailToUserNotVoted,
} from './mailSenders';

const allUserMailsAsync = async () => {
  const sendList = await getEmailSendList();

  return sendList;
}

const freshSuggestionsAsync = async () => {
  const freshSuggestions = await getFreshSuggestions({ settings, today: new Date() });

  return freshSuggestions;
};

const usersNotVotedAsync = async () => {
  const now = new Date();
  const votingStartDay = settings.period_voting_start_day;

  const users = getUsersNotVoted({ votingStartDay, now});

  return users;
}

function actUponPeriodChange({ days_to_next_period, elapsed_period_days, period}) {
  log(`Checking period: ${period}, elapsed days: ${elapsed_period_days}, next period in days: ${days_to_next_period}`);

  // SUGGEST
  if (period === PeriodType.SUGGEST) {
    if (elapsed_period_days === 0) {
      addDefaultSuggestions()
      .catch(e => log.erro(`Could not add default suggestions`, e));

      allUserMailsAsync()
      .then(allUserMails => sendMailSuggest({ allUserMails }))
      .catch(e => log.error(`Could not mail for period ${period}: `, e));
    }
  }
  // VOTE
  else if (period === PeriodType.VOTE) {
    if (elapsed_period_days === 0) {
      Promise.all([allUserMailsAsync(), freshSuggestionsAsync()])
      .then(([allUserMails, freshSuggestions]) => {
        sendMailVote({ allUserMails, freshSuggestions });
      })
      .catch(e => log.error(`Could not mail for period ${period}: `, e));
    } else {
      Promise.all([ usersNotVotedAsync(), freshSuggestionsAsync() ])
      .then(([users, freshSuggestions]) => {
        sendMailToUserNotVoted({ users, freshSuggestions })
      })
      .catch(e => log.error(`Could remind users to vote ${period}: `, e));
    }
  }
  // DISPLAY
  else if (period === PeriodType.DISPLAY) {
    if (elapsed_period_days === 0) {
      resolveEndorsedInPeriod({ settings, today: new Date() })
      .then(async () => {
        const allUserMails = await allUserMailsAsync();
        const freshSuggestions = await freshSuggestionsAsync();

        sendMailDisplay({ allUserMails, freshSuggestions });
      })
      .catch(e => log.error(`Could not mail for period ${period}: `, e));

    }
  } else {
    throw new Error('Could not descide period');
  }
}

export {
  actUponPeriodChange,
}
