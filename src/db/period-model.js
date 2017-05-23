import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  startedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  closed: {
    type: Boolean,
    default: false,
  },
});


schema.statics.startPeriod = function() {
  // const currentDate = new Date();
  // const suggestionStartDate = new Date(currentDate.getTime());
  // suggestionStartDate.setDate(suggestionStartDate);
  //
  // const votingStartDate = new Date(currentDate.getTime());
  // votingStartDate.setDate(votingStartDay);
  //
  // const displayStartDate = new Date(currentDate.getTime());
  // displayStartDate.setDate(displayStartDate);
  return Model
  .findOne({
    closed: false,
  })
  .then(existingPeriod => {
    if (!existingPeriod) {
      const period = new Model();
      return period.save();
    }

    console.log('Period exist, useing it instead: ', existingPeriod.startedAt.toString());

    return;
  });
}

schema.statics.getCurrent = () => {
  return this.findOne({ closed: false });
}

schema.statics.closePeriod = () => {
  return Model.update({closed: false}, { closed: true}, { multi: true});
}

const Model = mongoose.model('Period', schema);

export default Model;
