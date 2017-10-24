import test from 'ava';
import { calcDaysToDay, calcDaysFromDay, isDateInBetween } from '../date-calculator';

test('Calculate number of days to a future day date', t => {
  const today = new Date(2035, 1, 10);

  t.is(calcDaysToDay(25, today), 15);
  t.is(calcDaysToDay(3, today), 24);
});

test('Calculate number of days from a past day date', t => {
  const today = new Date(2057, 5, 20);

  t.is(calcDaysFromDay(30, today), 21);
  t.is(calcDaysFromDay(10, today), 10);
});

test('returns true if date is in betwee days', t => {
  const start = new Date(2111, 6, 20);
  const end = new Date(2111, 7, 10);

  t.truthy(isDateInBetween(start, end, new Date(2111, 6, 20)));
  t.truthy(isDateInBetween(start, end, new Date(2111, 7, 5)));
  t.truthy(isDateInBetween(start, end, new Date(2111, 7, 10)));

  t.falsy(isDateInBetween(start, end, new Date(2111, 6, 19)));
  t.falsy(isDateInBetween(start, end, new Date(2111, 7, 11)));
});
