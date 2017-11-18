'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadApp = exports.loadAuth = exports.historyRouter = exports.dynamicsRouter = exports.configRouter = exports.auth = undefined;

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _dynamics = require('./dynamics');

var _dynamics2 = _interopRequireDefault(_dynamics);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _history = require('./history');

var _history2 = _interopRequireDefault(_history);

var _statics = require('./statics');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.auth = _auth2.default;
exports.configRouter = _config2.default;
exports.dynamicsRouter = _dynamics2.default;
exports.historyRouter = _history2.default;
exports.loadAuth = _statics.loadAuth;
exports.loadApp = _statics.loadApp;