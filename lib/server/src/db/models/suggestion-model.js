import { Schema } from 'mongoose';
import connect from './connect';

const schema = new Schema({
  name: {
    type: String,
    minLength: 2,
    required: true,
  },
  description: {
    type: String,
    minLength: 10,
    required: true,
  },
  submitter: {
    username: {
      type: String,
    },
    time: {
      type: Date,
      default: Date.now
    },
  },
  voting: {
    num_of_votes: {
      type: Number,
      default: 0,
    },
    is_endorsed: {
      type: Boolean,
      default: false,
    },
    vote_round: {
      type: Number,
      default: 1,
    }
  },
});

const SuggestionModel = connect().model('Suggestion', schema);
//SuggestionModel.ensureIndexes();

export default SuggestionModel;
