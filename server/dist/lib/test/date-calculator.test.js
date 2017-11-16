'use strict';

var _dateCalculator = require('../date-calculator');

describe('date-calculator', () => {
  it('Calculate number of days to a future day date', () => {
    const today = new Date(2035, 1, 10);

    expect((0, _dateCalculator.calcDaysToDay)(25, today)).to.be.equal(15);
    expect((0, _dateCalculator.calcDaysToDay)(3, today)).to.be.equal(24);
  });

  it('Calculate number of days from a past day date', () => {
    const today = new Date(2057, 5, 20);

    expect((0, _dateCalculator.calcDaysFromDay)(30, today)).to.be.equal(21);
    expect((0, _dateCalculator.calcDaysFromDay)(10, today)).to.be.equal(10);
  });

  it('returns true if date is in between days', () => {
    const start = new Date(2111, 6, 20);
    const end = new Date(2111, 7, 10);

    [(0, _dateCalculator.isDateInBetween)(start, end, new Date(2111, 6, 20)), (0, _dateCalculator.isDateInBetween)(start, end, new Date(2111, 7, 5)), (0, _dateCalculator.isDateInBetween)(start, end, new Date(2111, 7, 10))].forEach(isBetween => {
      expect(isBetween).to.be.true();
    });
  });

  it('returns false if date is in outside interval', () => {
    const start = new Date(2111, 6, 20);
    const end = new Date(2111, 7, 10);

    [(0, _dateCalculator.isDateInBetween)(start, end, new Date(2111, 6, 19)), (0, _dateCalculator.isDateInBetween)(start, end, new Date(2111, 7, 11))].forEach(isBetween => {
      expect(isBetween).to.be.false();
    });
  });

  it('rewind a date number of days same month', () => {
    const date = new Date(2111, 6, 20);

    const rewinded = (0, _dateCalculator.rewindDateToDay)(date, 6);

    expect(rewinded.getMonth()).to.be.equal(6);
    expect(rewinded.getDate()).to.be.equal(6);
  });

  it('rewind a date number of days previous month', () => {
    const date = new Date(2111, 6, 20);

    const rewinded = (0, _dateCalculator.rewindDateToDay)(date, 22);

    expect(rewinded.getMonth()).to.be.equal(5);
    expect(rewinded.getDate()).to.be.equal(22);
  });
});