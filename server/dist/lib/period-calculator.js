'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculatePeriodState = undefined;

var _PeriodType = require('../../../shared/types/PeriodType');

var _PeriodType2 = _interopRequireDefault(_PeriodType);

var _dateCalculator = require('./date-calculator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculatePeriodState({ settings, today }) {
  const times = [{ period: _PeriodType2.default.SUGGEST,
    day: settings.period_suggest_start_day
  }, { period: _PeriodType2.default.VOTE,
    day: settings.period_voting_start_day
  }, { period: _PeriodType2.default.DISPLAY,
    day: settings.period_display_start_day
  }];

  const isDayInTime = day => time => time.day === day ? time : null;

  const resolvePeriod = () => {
    let dayNum = today.getDate();
    for (;;) {
      const time = times.find(isDayInTime(dayNum));

      if (time) {
        return time;
      }

      dayNum > 0 ? dayNum -= 1 : dayNum += 31;
    }
  };

  const time = resolvePeriod();

  if (time.period === _PeriodType2.default.SUGGEST) {
    return {
      period: _PeriodType2.default.SUGGEST,
      days_to_next_period: (0, _dateCalculator.calcDaysToDay)(settings.period_voting_start_day, today),
      elapsed_period_days: (0, _dateCalculator.calcDaysFromDay)(settings.period_suggest_start_day, today)
    };
  } else if (time.period === _PeriodType2.default.VOTE) {
    return {
      period: _PeriodType2.default.VOTE,
      days_to_next_period: (0, _dateCalculator.calcDaysToDay)(settings.period_display_start_day, today),
      elapsed_period_days: (0, _dateCalculator.calcDaysFromDay)(settings.period_voting_start_day, today)
    };
  } else {
    return {
      period: _PeriodType2.default.DISPLAY,
      days_to_next_period: (0, _dateCalculator.calcDaysToDay)(settings.period_suggest_start_day, today),
      elapsed_period_days: (0, _dateCalculator.calcDaysFromDay)(settings.period_display_start_day, today)
    };
  }
}

exports.calculatePeriodState = calculatePeriodState;