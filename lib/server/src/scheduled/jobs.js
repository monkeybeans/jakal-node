import settings from '../settings';
import { calculatePeriodState } from '../lib/period-calculator';
import PeriodType from '../../../shared/types/PeriodType';
import {
  resolveEndorsedInPeriod } from '../db/handlers/voting-utils';
import log from '../lib/logger';
import MailSender from '../communication/MailSender';
import { getFreshSuggestions } from '../db/handlers/suggestions';
import { getEmailSendList } from '../db/handlers/users';
import {
  suggestionBeginHTML,
  votingBeginHTML,
  votingFinishHTML,
} from '../communication/templates';

const sendMailSuggest = () =>
  getEmailSendList()
  .then(sendList => {
    const mail = new MailSender({
      to: sendList,
      subject: 'Voting has started',
      html: suggestionBeginHTML(),
    });

    mail.send();
  });

const sendMailVote = () => {
  const sendMail = sendList =>
    getFreshSuggestions({ settings, today: new Date() })
    .then(listed => {
      const mail = new MailSender({
        to: sendList,
        subject: 'Voting has started',
        html: votingBeginHTML({ suggestions: listed }),
      });

      mail.send();
    });

  return getEmailSendList()
  .then(sendMail);
}

const sendMailDisplay = () => {
  const sendMail = (sendList) => {
    return getFreshSuggestions({ settings, today: new Date() })
      .then(fresh => {
        const freshEndorsed = fresh.filter(s => s.voting.is_endorsed);

        if (freshEndorsed.length <= 1) {
          const mail = new MailSender({
            to: sendList,
            subject: 'Voting is finished',
            html: votingFinishHTML({ suggestion: freshEndorsed[0] }),
          });

          mail.send();
        } else {
          throw new Error(`More then one endorsed suggestion found: ${freshEndorsed}`);
        }
      });
  }

  return getEmailSendList()
  .then(sendMail);
}

export const actUponPeriodChange = () => {
  const {
    days_to_next_period,
    elapsed_period_days,
    period,
  } = calculatePeriodState({ today: new Date(), settings });

  log(`Checking period: ${period}, elapsed days: ${elapsed_period_days}, next period in days: ${days_to_next_period}`);

  // SUGGEST
  if (period === PeriodType.SUGGEST) {
    if (elapsed_period_days === 0) {
      sendMailSuggest()
      .catch(e => log.error(`Could not mail for period ${period}: `, e));
    }
  }
  // VOTE
  else if (period === PeriodType.VOTE) {
    if (elapsed_period_days === 0) {
      sendMailVote()
      .catch(e => log.error(`Could not mail for period ${period}: `, e));

    }
  }
  // DISPLAY
  else if (period === PeriodType.DISPLAY) {
    if (elapsed_period_days === 0) {
      resolveEndorsedInPeriod({ settings, today: new Date() })
      .then(sendMailDisplay)
      .catch(e => log.error(`Could not mail for period ${period}: `, e));

    }
  } else {
    throw new Error('Could not descide period');
  }
};
