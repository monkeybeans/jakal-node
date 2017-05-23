import mongoose from 'mongoose';
import SuggestionModel from './suggestion-model';
import PeriodModel from './period-model';
import UserModel from './user-model';

const connect = (/*, username, password */) => {
  mongoose.Promise = global.Promise || Promise;
  //const query = Object.keys(options).map(k => `k=options[k]`).join(',');
  //mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}?${query}`);
  mongoose.connect('mongodb://localhost/jakal');

  const db = mongoose.connection;
  //db.onse('open', () => {});
  db.on('open', console.info.bind(console, 'MongoDB connection established...'));
  db.on('error', console.error.bind(console, 'MongoDB connection error: '));

  return db;
}


export {
  connect,
  SuggestionModel,
  UserModel,
  PeriodModel,
}
