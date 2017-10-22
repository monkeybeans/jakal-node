import PeriodEnum from '../types/PeriodEnum';
import { calcDaysToDay, calcDaysFromDay, isDateInBetween } from '../lib/date-calculator';
import { configModel } from '../db';

class ConfigTemplate {
  constructor() {
    const date = new Date();

    configModel.find()
    const daysToNextPeriod = null;
    const elapsedPeriodDays = null;
    const period = null;

    const suggestStartDay = null;

    // @property('period_voting_start_day')
    const voteStartDay = null;

    // @property('period_display_start_day')
    const displayStartDay = null;

  // this.period = this.getPeriod();

  // this.daysToNextPeriod = calcDaysToDay(, new Date());
  // this.elapsedPeriodDays = calcDaysFromDay(, new Date());
  }
}

export default ConfigTemplate;
