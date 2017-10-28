import { calcDaysToDay, calcDaysFromDay, isDateInBetween } from '../date-calculator';

describe('date-calculator', () => {
  it('Calculate number of days to a future day date', () => {
    const today = new Date(2035, 1, 10);

    expect(calcDaysToDay(25, today)).to.be.equal(15);
    expect(calcDaysToDay(3, today)).to.be.equal(24);
  });

  it('Calculate number of days from a past day date', () => {
    const today = new Date(2057, 5, 20);

    expect(calcDaysFromDay(30, today)).to.be.equal(21);
    expect(calcDaysFromDay(10, today)).to.be.equal(10);
  });

  it('returns true if date is in between days', () => {
    const start = new Date(2111, 6, 20);
    const end = new Date(2111, 7, 10);

    [
      isDateInBetween(start, end, new Date(2111, 6, 20)),
      isDateInBetween(start, end, new Date(2111, 7, 5)),
      isDateInBetween(start, end, new Date(2111, 7, 10)),
    ]
    .forEach(isBetween => {
      expect(isBetween).to.be.true();
    });
  });

  it('returns false if date is in outside interval', () => {
    const start = new Date(2111, 6, 20);
    const end = new Date(2111, 7, 10);

    [
      isDateInBetween(start, end, new Date(2111, 6, 19)),
      isDateInBetween(start, end, new Date(2111, 7, 11)),
    ]
    .forEach(isBetween => {
      expect(isBetween).to.be.false();
    });
  });
});
