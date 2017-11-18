'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = new _mongoose.Schema({
  username: {
    type: String,
    minLength: 2,
    maxLength: 25,
    match: new RegExp('^[\\w\\$\\*]{2,}$'),
    unique: true,
    required: true
  },
  emails: {
    type: [{ type: String, required: true }],
    required: true
  },
  lastVoting: {
    type: Date,
    default: new Date(0)
  },
  password: {
    type: String,
    minLength: 40,
    required: true
  },
  session: {
    type: String,
    default: null
  }
});

const UserModel = (0, _connect2.default)().model('User', schema);

exports.default = UserModel;