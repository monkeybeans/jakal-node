import { CronJob } from 'cron';
import settings from '../settings';
import { calculatePeriodState } from '../lib/period-calculator';
import PeriodType from '../types/PeriodType';
import {
  startVoting,
  reolveSuggestionAsPickedAndRejected } from '../db/handlers/voting-utils';
import log from '../lib/logger';
import MailSender from '../communication/MailSender';

const TIME_ZONE = 'Europe/Berlin';

const sendMail = (msg) => {
  log.info('this would be some mail sent: ', msg);
}

const actUponPeriodChange = () => {
  const {
    days_to_next_period,
    elapsed_period_days,
    period,
  } = calculatePeriodState({ today: new Date(), settings });

  log(`Checking period: ${period}, elapsed days: ${elapsed_period_days}, next period in days: ${days_to_next_period}`);

  // SUGGEST
  if (period === PeriodType.SUGGEST) {
    if (elapsed_period_days === 0){
      const mail = new MailSender();

      // mail
      // .setTo(addresses)
      // .setSubject(subject)
      // .setHtml(html)
      // .send();
    }
  }
  // VOTE
  else if (period === PeriodType.VOTE) {
    if (elapsed_period_days === 0){
      startVoting();
      sendMail(`period ${period} started!!`);
    }
  }
  // DISPLAY
  else if (period === PeriodType.DISPLAY) {
    if (elapsed_period_days === 0){
      reolveSuggestionAsPickedAndRejected();
      sendMail(`period ${period} started!!`);
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
