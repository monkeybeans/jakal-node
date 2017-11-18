'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDevelopment = exports.isTest = exports.isProduction = exports.getEnvironment = undefined;
exports.parseArgs = parseArgs;
exports.loadSecret = loadSecret;

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseArgs(args) {
  const parsed = args.reduce((parsed, arg) => {
    parsed[arg.split('=')[0]] = arg.split('=')[1];

    return parsed;
  }, {});

  return parsed;
}

function loadSecret(path) {
  try {
    const secret = require(path);

    return secret;
  } catch (e) {
    _logger2.default.error('Could not load secret: ', e.message);
    return {};
  }
}

const getEnvironment = exports.getEnvironment = () => process.env.NODE_ENV || 'ENVIRONMENT_UNDEFINED';
const isProduction = exports.isProduction = () => getEnvironment() === 'PRODUCTION';
const isTest = exports.isTest = () => getEnvironment() === 'TEST';
const isDevelopment = exports.isDevelopment = () => getEnvironment() === 'DEVELOPMENT';