import mongoose, { Schema } from 'mongoose';

mongoose.Promise = Promise;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  _submitted_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  submitted: {
    type: Date,
    default: Date.now
  },
  num_om_votes: Number,
  _period: {
    type: Schema.Types.ObjectId,
    ref: 'Period'
  },
});

export default mongoose.model('Suggestion', schema);
