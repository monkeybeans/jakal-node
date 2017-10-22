import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  submitter: {
    _submitted_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
    started: {
      type: Date,
      default: null,
    },
    vote_round: {
      type: Number,
      default: 1,
    }
  },
});

const Model = mongoose.model('Suggestion', schema);

export default Model;
