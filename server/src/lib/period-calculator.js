import PeriodType from '../types/PeriodType';
import {
  calcDaysToDay,
  calcDaysFromDay,
  isDateInBetween,
} from './date-calculator';

const incrementToOverlappingDaysInDate = (date, numDays) => {
  const cloneDate = new Date(date);

  if (cloneDate.getDate() < numDays) {
    cloneDate.setDate(numDays + 1);
  } else if (cloneDate.getDate() > numDays) {
    cloneDate.setDate(numDays + cloneDate.getDate());
  } else {
    //do nothing
  }

  return cloneDate;
};

function calculatePeriodState({ settings, today }) {
  const suggestDate = incrementToOverlappingDaysInDate(today, settings.period_suggest_start_day);
  const votingDate = incrementToOverlappingDaysInDate(today, settings.period_voting_start_day);
  const displayDate = incrementToOverlappingDaysInDate(today, settings.period_display_start_day);

  if (isDateInBetween(suggestDate, votingDate, today)) {
    return {
      period: PeriodType.SUGGEST,
      days_to_next_period: calcDaysToDay(settings.period_voting_start_day, today),
      elapsed_period_days: calcDaysFromDay(settings.period_suggest_start_day, today),
    }
  } else if (isDateInBetween(votingDate, displayDate, today)) {
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
