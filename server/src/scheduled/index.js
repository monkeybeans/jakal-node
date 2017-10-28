import { CronJob } from 'cron';
import settings from '../settings';
import { calculatePeriodState } from '../lib/period-calculator';
import PeriodType from '../types/PeriodType';
import {
  startVoting,
  reolveSuggestionAsEndorsedAndRejected } from '../db/handlers/voting-utils';
import log from '../lib/logger';
import MailSender from '../communication/MailSender';
import {
  getListedSuggestions,
  getEndorsedSuggestions } from '../db/handlers/suggestions';
import { getEmailSendList } from '../db/handlers/users';
import {
  suggestionBeginHTML,
  votingBeginHTML,
  votingFinishHTML,
} from '../communication/templates';

const TIME_ZONE = 'Europe/Berlin';

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
    getListedSuggestions()
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
  const sendMail = sendList =>
    getEndorsedSuggestions()
    .then(endorsed => {
      const mail = new MailSender({
        to: sendList,
        subject: 'Voting is finished',
        html: votingFinishHTML({ suggestion: endorsed[0] }),
      });

      mail.send();
    });

  return getEmailSendList()
  .then(sendMail);
}

const actUponPeriodChange = async () => {
  const {
    days_to_next_period,
    elapsed_period_days,
    period,
  } = calculatePeriodState({ today: new Date(), settings });

  log(`Checking period: ${period}, elapsed days: ${elapsed_period_days}, next period in days: ${days_to_next_period}`);

  // SUGGEST
  if (period === PeriodType.SUGGEST) {
    if (elapsed_period_days === 0) {
      sendMailSuggest();
    }
  }
  // VOTE
  else if (period === PeriodType.VOTE) {
    if (elapsed_period_days === 0) {
      await startVoting();

      sendMailVote();
    }
  }
  // DISPLAY
  else if (period === PeriodType.DISPLAY) {
    if (elapsed_period_days === 0) {
      await reolveSuggestionAsEndorsedAndRejected();

      sendMailDisplay();
    }
  } else {
    throw Error('Could not descide period');
  }
};

const actUponPeriodChangeSchedule = new CronJob({
  cronTime: '00 00 02 * * *',
  onTick: actUponPeriodChange,
  startNow: false,
  runOnInit: true,
  timeZone: TIME_ZONE,
});

export {
  actUponPeriodChangeSchedule,
}
