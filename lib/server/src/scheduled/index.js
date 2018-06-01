import { CronJob } from 'cron';
import settings from '../settings';
import { actUponPeriodChange } from './jobs';
import { calculatePeriodState } from '../lib/period-calculator';

const TIME_ZONE = 'Europe/Berlin';

function configuredActUponPeriodChange() {
  const {
    days_to_next_period,
    elapsed_period_days,
    period,
  } = calculatePeriodState({ today: new Date(), settings });

  actUponPeriodChange({
    days_to_next_period,
    elapsed_period_days,
    period,
  });
}

const actUponPeriodChangeSchedule = new CronJob({
  cronTime: '00 00 02 * * *',
  onTick: configuredActUponPeriodChange,
  startNow: false,
  runOnInit: false,
  timeZone: TIME_ZONE,
});

export {
  actUponPeriodChangeSchedule,
  actUponPeriodChange,
}
