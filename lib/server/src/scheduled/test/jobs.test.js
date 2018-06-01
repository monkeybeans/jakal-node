import { actUponPeriodChange } from '../jobs';
import PeriodType from '../../../../shared/types/PeriodType';

describe('scheduled jobs', () => {
  it('Runs right for SUGGEST', () => {
    const days_to_next_period = 0;
    const elapsed_period_days = 0;
    const period = PeriodType.SUGGEST;

    actUponPeriodChange({days_to_next_period, elapsed_period_days, period});
  });

  it('Runs right for VOTE first day', () => {
    const days_to_next_period = 21;
    const elapsed_period_days = 0;
    const period = PeriodType.VOTE;

    actUponPeriodChange({days_to_next_period, elapsed_period_days, period});
  });

  it('Runs right for VOTE remaining days', () => {
    const days_to_next_period = 15;
    const elapsed_period_days = 1;
    const period = PeriodType.VOTE;

    actUponPeriodChange({days_to_next_period, elapsed_period_days, period});
  });

  it('Runs right for period DISPLAY', () => {
    const days_to_next_period = 0;
    const elapsed_period_days = 0;
    const period = PeriodType.DISPLAY;

    actUponPeriodChange({days_to_next_period, elapsed_period_days, period});
  });
});
