import test from 'ava';
import { calculatePeriodState } from '../period-calculator';
import PeriodType from '../../types/PeriodType';

test('Calculationg the config date no overlap', t => {
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

  t.deepEqual(result, expected);
});

test('Calculationg the config date overlapping', t => {
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
    days_to_next_period: 16,
    elapsed_period_days: 5,
    period: PeriodType.DISPLAY,
  };

  t.deepEqual(result, expected);
});

test.only('Calculationg the config date overlapping 2', t => {
  const today = new Date(2300, 10, 25);
  const settings = {
    period_suggest_start_day: 10,
    period_voting_start_day: 1,
    period_display_start_day: 8,
  };

  const result = calculatePeriodState({
    settings,
    today,
  });

  const expected = {
    days_to_next_period: 28,
    elapsed_period_days: 15,
    period: PeriodType.SUGGEST,
  };

  t.deepEqual(result, expected);
});
