import { Schema } from 'mongoose';
import connect from './connect';

const schema = new Schema({
  identifier: {
    type: String,
    minLength: 36,
    required: true,
  },
  last_accessed: {
    type: Date,
    required: true,
  },
  authenticated: {
    type: Boolean,
    default: false,
  },
  settings: {
    type: Object,
    default: {},
  }
});

const SuggestionModel = connect().model('Session', schema);
//SuggestionModel.ensureIndexes();

export default SuggestionModel;
