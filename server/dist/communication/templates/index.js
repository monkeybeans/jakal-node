'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.votingFinishHTML = exports.votingBeginHTML = exports.suggestionBeginHTML = exports.newSuggestionHTML = undefined;

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('../../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SITE_URL = 'https://redhat.storage.jakal.com';

const loadSource = path => {
  try {
    return _fs2.default.readFileSync(_path2.default.resolve(__dirname, path), { encoding: 'utf8' });
  } catch (e) {
    _logger2.default.error('Could not load path: ', path);
    _logger2.default.error(e);
  }

  return null;
};

const creaatehtml = (template, context) => {
  const source = loadSource(template);
  const extendedContext = Object.assign({}, context, {
    SITE_URL
  });

  return _handlebars2.default.compile(source)(extendedContext);
};

const newSuggestionHTML = exports.newSuggestionHTML = context => creaatehtml('./newSuggestion.hbs', context);
const suggestionBeginHTML = exports.suggestionBeginHTML = context => creaatehtml('./suggestionBegin.hbs', context);
const votingBeginHTML = exports.votingBeginHTML = context => creaatehtml('./votingBegin.hbs', context);
const votingFinishHTML = exports.votingFinishHTML = context => creaatehtml('./votingFinish.hbs', context);