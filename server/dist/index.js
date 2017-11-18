'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _routes = require('./routes');

var _periodCalculator = require('./lib/period-calculator');

var _models = require('./db/models');

var _models2 = _interopRequireDefault(_models);

var _scheduled = require('./scheduled');

var _logger = require('./lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _argUtils = require('./lib/arg-utils');

var _pathConstants = require('./lib/path-constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = (0, _express2.default)();
const PORT = process.env.PORT || 8085;
const STATIC_PATH = _path2.default.join(__dirname, '../../app/dist');

function errorHandler(err, req, res, next) {
  _logger2.default.error("Error Handler recieved: " + err);
  res.status(500).json({ error: err.message });
  next();
}

function ping(req, res) {
  res.send('pong');
}

function accessLog(req, res, next) {
  (0, _logger2.default)(`${req.method} ${req.originalUrl}`);
  next();
}

server.use(_bodyParser2.default.json()).use((0, _cookieParser2.default)()).use(accessLog).get('/ping', ping).use('/assets', _express2.default.static(STATIC_PATH)).get(_pathConstants.AUTH_PATH, _routes.loadAuth).use(_routes.auth).use('/api/v1', _routes.configRouter).use('/api/v1', _routes.dynamicsRouter).use('/api/v1', _routes.historyRouter).use('/', _routes.loadApp).use(errorHandler);

server.listen(PORT, () => {
  const {
    days_to_next_period,
    elapsed_period_days,
    period
  } = (0, _periodCalculator.calculatePeriodState)({ today: new Date(), settings: _settings2.default });

  (0, _logger2.default)(`Listening on port ${PORT}!`);
  (0, _logger2.default)(`Running in environment: ${(0, _argUtils.getEnvironment)()}`);
  (0, _logger2.default)(`period: ${period}, elapsed days: ${elapsed_period_days}, next period in days: ${days_to_next_period}`);

  (0, _models2.default)();
  _scheduled.actUponPeriodChangeSchedule.start();
});