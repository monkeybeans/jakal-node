import PeriodEnum from '../models/PeriodEnum';
import { calcDaysToDay, calcDaysFromDay, isDateInBetween } from '../lib/date-calculator';
import { property } from '../lib/decorators';
class ConfigTemplate {
    private daysToNextPeriod: number;
    private elapsedPeriodDays: number;
    private period: PeriodEnum;

    @property('period_suggest_start_day')
    private suggestStartDay: number;

    // @property('period_voting_start_day')
    private voteStartDay: number;

    // @property('period_display_start_day')
    private displayStartDay: number;

    constructor() {

    // this.period = this.getPeriod();

    // this.daysToNextPeriod = calcDaysToDay(, new Date());
    // this.elapsedPeriodDays = calcDaysFromDay(, new Date());
    }
}

export default ConfigTemplate;
