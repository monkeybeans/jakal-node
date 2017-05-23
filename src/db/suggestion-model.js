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
  _submitted_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  submitted: {
    type: Date,
    default: Date.now
  },
  num_of_votes: Number,
});


schema.statics.getAllInPeriod = (PeriodModel) => {
  return PeriodModel.getCurrent()
  .then(period => this.find({ submitted: { $gte: period.startedAt } }));
};

schema.statics.findById = id => {
  return this
  .find({ _id: id });
};

schema.statics.addVote = id => {
  return this
  .find({ _id: id })
  .then(suggestion => {
    suggestion.num_of_votes += 1;
    suggestion.save();
  });
};

const Model = mongoose.model('Suggestion', schema);

export default Model;
