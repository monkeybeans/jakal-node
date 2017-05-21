import mongoose from 'mongoose';
import SuggestionModel from './suggestion-model';

const Schema = mongoose.Schema;

const periodSchema = new Schema({
  duration: [Date, Date],
  suggestion_duration: [Date, Date],
  voting_duration: [Date, Date],
  display_duration: [Date, Date],
});

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  emails: [String],
  password: String,
});

const testSchema = new Schema({
  number: Number,
  string: String,
});


const connect = (mongoose /*, username, password */) => {
  mongoose.Promise = global.Promise || Promise;
  //const query = Object.keys(options).map(k => `k=options[k]`).join(',');
  //mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}?${query}`);
  mongoose.connect('mongodb://localhost/jakal');

  const db = mongoose.connection;
  //db.onse('open', () => {});
  db.on('open', console.info.bind(console, 'MongoDB connection established: '));
  db.on('error', console.error.bind(console, 'MongoDB connection error: '));

  return db;
}

const UserModel = mongoose.model('User', userSchema);
const PeriodModel = mongoose.model('Period', periodSchema);
const TestModel = mongoose.model('Test', testSchema);

export {
  connect,
  SuggestionModel,
  UserModel,
  PeriodModel,
  TestModel,
}
