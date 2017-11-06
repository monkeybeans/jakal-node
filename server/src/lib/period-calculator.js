import PeriodType from '../../../shared/types/PeriodType';
import {
  calcDaysToDay,
  calcDaysFromDay,
} from './date-calculator';

function calculatePeriodState({ settings, today }) {
  const times = [
    { period: PeriodType.SUGGEST,
      day: settings.period_suggest_start_day,
    },
    { period: PeriodType.VOTE,
      day: settings.period_voting_start_day,
    },
    { period: PeriodType.DISPLAY,
      day: settings.period_display_start_day,
    },
  ];

  const isDayInTime = day => time => time.day === day ? time : null;

  const resolvePeriod = () => {
    let dayNum = today.getDate();
    for(;;) {
      const time = times.find(isDayInTime(dayNum));

      if (time) {
        return time;
      }

      dayNum > 0 ? (dayNum -= 1) : (dayNum += 31);
    }
  }

  const time = resolvePeriod();

  if (time.period === PeriodType.SUGGEST) {
    return {
      period: PeriodType.SUGGEST,
      days_to_next_period: calcDaysToDay(settings.period_voting_start_day, today),
      elapsed_period_days: calcDaysFromDay(settings.period_suggest_start_day, today),
    }
  } else if (time.period === PeriodType.VOTE) {
    return {
      period: PeriodType.VOTE,
      days_to_next_period: calcDaysToDay(settings.period_display_start_day, today),
      elapsed_period_days: calcDaysFromDay(settings.period_voting_start_day, today),
    }
  } else {
    return {
      period: PeriodType.DISPLAY,
      days_to_next_period: calcDaysToDay(settings.period_suggest_start_day, today),
      elapsed_period_days: calcDaysFromDay(settings.period_display_start_day, today),
    }
  }
}


export { calculatePeriodState };
