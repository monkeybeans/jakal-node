import PeriodEnum from '../models/PeriodEnum';
import { calcDaysToDay, calcDaysFromDay } from '../lib/date-calculator';

class ConfigTemplate {
  private daysToNextPeriod: number;
  private elapsedPeriodDays: number;
  private period: PeriodEnum;

  constructor() {
    // this.period = this.getPeriod();

    // this.daysToNextPeriod = calcDaysToDay(, new Date());
    // this.elapsedPeriodDays = calcDaysFromDay(, new Date());
  }

  private calcDaysToNextPeriod(): number {
    return null;
  }

  private calcElapsedPeriodDays(): number {

    return null;
  }

}

export default ConfigTemplate;
