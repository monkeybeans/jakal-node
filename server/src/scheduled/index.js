import { CronJob } from 'cron';
import actUponPeriodChange from './jobs';
const TIME_ZONE = 'Europe/Berlin';

const actUponPeriodChangeSchedule = new CronJob({
  cronTime: '00 00 02 * * *',
  onTick: actUponPeriodChange,
  startNow: false,
  runOnInit: false,
  timeZone: TIME_ZONE,
});

export {
  actUponPeriodChangeSchedule,
  actUponPeriodChange,
}
