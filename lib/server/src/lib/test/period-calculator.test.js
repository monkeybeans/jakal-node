import { calculatePeriodState } from '../period-calculator';
import PeriodType from '../../../../shared/types/PeriodType';

describe('period-calculator', () => {
  it('Calculationg the config date no overlap', () => {
    const today = new Date(2100, 1, 1);
    const settings = {
      period_suggest_start_day: 1,
      period_voting_start_day: 20,
      period_display_start_day: 25,
    };

    const result = calculatePeriodState({
      settings,
      today,
    });

    const expected = {
      days_to_next_period: 19,
      elapsed_period_days: 0,
      period: PeriodType.SUGGEST,
    };

    expect(result).to.eql(expected);
  });

  it('Calculationg the config date overlapping', () => {
    const today = new Date(2300, 1, 25);
    const settings = {
      period_suggest_start_day: 10,
      period_voting_start_day: 15,
      period_display_start_day: 20,
    };

    const result = calculatePeriodState({
      settings,
      today,
    });

    const expected = {
      days_to_next_period: 13,
      elapsed_period_days: 5,
      period: PeriodType.DISPLAY,
    };

    expect(result).to.eql(expected);
  });

  it('Calculationg the config date overlapping 2', () => {
    const today = new Date(2300, 10, 25);
    const settings = {
      period_suggest_start_day: 10,
      period_voting_start_day: 15,
      period_display_start_day: 8,
    };

    const result = calculatePeriodState({
      settings,
      today,
    });

    const expected = {
      days_to_next_period: 13,
      elapsed_period_days: 10,
      period: PeriodType.VOTE,
    };

    expect(result).to.eql(expected);
  });

  it('Calculationg the config date overlapping 3', () => {
    const today = new Date(2300, 10, 4);
    const settings = {
      period_suggest_start_day: 20,
      period_voting_start_day: 25,
      period_display_start_day: 5,
    };

    const result = calculatePeriodState({
      settings,
      today,
    });

    const expected = {
      days_to_next_period: 1,
      elapsed_period_days: 10,
      period: PeriodType.VOTE,
    };

    expect(result).to.eql(expected);
  });
});
