import config from '../../config/application-properties.json';
import { CronJob } from 'node-cron';
import { isDateInBetween, calcDaysFromDay } from '../date-calculator';
import { SuggestionModel } from '../../db';

const TIME_ZONE = 'Europe/Berlin';

const dailySchedule = {
  task: () => {
    const {
      period_suggest_start_day,
      period_voting_start_day,
      period_display_start_day,
    } = config;

    const currentDate = new Date();
    // suggestion
    if (isDateInBetween(period_suggest_start_day, period_voting_start_day, currentDate)) {
      if (calcDaysFromDay(period_suggest_start_day, currentDate) === 0){
      }
    }
    // vote
    else if (isDateInBetween(period_voting_start_day, period_display_start_day, currentDate)) {
      if (calcDaysFromDay(period_voting_start_day, currentDate) === 0){
        SuggestionModel.startVoting();
      }
    }
    // display
    else if (isDateInBetween(period_display_start_day, period_display_start_day, currentDate)) {

    } else {
      throw Error('Could not descide period');
    }
  },

  job: new CronJob(
    '00 00 02 * * *',
    dailySchedule.task,
    console.log.bind(console, 'Day task run'),
    false,
    TIME_ZONE
  ),
}

export {
  dailySchedule,
}
