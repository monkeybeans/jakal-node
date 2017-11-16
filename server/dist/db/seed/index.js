'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = seed;

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _logger = require('../../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function seed() {
  const connection = (0, _models2.default)();

  _models.UserModel.remove().then(() => _models.UserModel.insertMany(_users2.default)).then(() => (0, _logger2.default)(`Inserted ${_users2.default.length} user(s)`)).catch(e => {
    throw e;
  }).then(() => connection.close());
}