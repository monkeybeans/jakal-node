'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = new _mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    required: true
  },
  description: {
    type: String,
    minLength: 10,
    required: true
  },
  submitter: {
    _submitted_by: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    time: {
      type: Date,
      default: Date.now
    }
  },
  voting: {
    num_of_votes: {
      type: Number,
      default: 0
    },
    is_endorsed: {
      type: Boolean,
      default: false
    },
    vote_round: {
      type: Number,
      default: 1
    }
  }
});

const SuggestionModel = (0, _connect2.default)().model('Suggestion', schema);
//SuggestionModel.ensureIndexes();

exports.default = SuggestionModel;