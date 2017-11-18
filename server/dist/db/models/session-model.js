'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = new _mongoose.Schema({
  identifier: {
    type: String,
    minLength: 36,
    required: true
  },
  last_accessed: {
    type: Date,
    required: true
  },
  authenticated: {
    type: Boolean,
    default: false
  },
  settings: {
    type: Object,
    default: {}
  }
});

const SuggestionModel = (0, _connect2.default)().model('Session', schema);
//SuggestionModel.ensureIndexes();

exports.default = SuggestionModel;