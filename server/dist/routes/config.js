'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculatePeriodState = exports.default = undefined;

var _express = require('express');

var express = _interopRequireWildcard(_express);

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

var _periodCalculator = require('../lib/period-calculator');

var _users = require('../db/handlers/users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const router = express.Router();

//const daysInMonthForDate = date => (new Date(date.getFullYear(), date.getMonth(), 0)).getDate();


router.get('/config', (req, res, next) => {
  const session = req.cookies.session;

  const periodData = (0, _periodCalculator.calculatePeriodState)({
    settings: _settings2.default,
    today: new Date()
  });

  (0, _users.checkIfVotingAllowed)(session).then(voteEligible => {
    res.json(Object.assign({}, periodData, { userHasVoted: !voteEligible }));
  }).catch(next);
});

exports.default = router;
exports.calculatePeriodState = _periodCalculator.calculatePeriodState;