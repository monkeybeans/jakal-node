'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _logger = require('../../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _argUtils = require('../../lib/arg-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection = null;

const connect = () => /*, username, password */{
  if (connection) return connection;

  _mongoose2.default.Promise = global.Promise || Promise;
  //const query = Object.keys(options).map(k => `k=options[k]`).join(',');
  //mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}?${query}`);

  const getUri = () => {
    if ((0, _argUtils.isTest)()) {
      (0, _logger2.default)('Using test database');
      return 'mongodb://localhost/jakal_testing';
    } else if ((0, _argUtils.isDevelopment)() || (0, _argUtils.isProduction)()) {
      (0, _logger2.default)('Using production database');
      return 'mongodb://localhost/jakal';
    } else {
      throw new Error(`Unknown environment(${(0, _argUtils.getEnvironment)()}), could not descide monogo uri`);
    }
  };

  connection = _mongoose2.default.createConnection(getUri());

  //mongoose.connection;
  //db.onse('open', () => {});
  connection.on('open', () => {
    (0, _logger2.default)('MongoDB connection established');
  });

  connection.on('close', () => {
    (0, _logger2.default)('MongoDB connection closed');
    connection = null;
  });

  connection.on('error', () => {
    (0, _logger2.default)('MongoDB connection error: ');
    connection = null;
  });

  return connection;
};

exports.default = connect;