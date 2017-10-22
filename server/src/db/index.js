import mongoose from 'mongoose';
import SuggestionModel from './suggestion-model';
import PeriodModel from './period-model';
import UserModel from './user-model';

const isInTestEnv = process.env.NODE_ENV === 'test';

const connect = (/*, username, password */) => {
  mongoose.Promise = global.Promise || Promise;
  //const query = Object.keys(options).map(k => `k=options[k]`).join(',');
  //mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}?${query}`);

  if (isInTestEnv) {
    console.info('# using test database');
    mongoose.connect('mongodb://localhost/jakal_testing', {
      useMongoClient: true, //to avoid warning :[]
    });
  } else {
    mongoose.connect('mongodb://localhost/jakal');
  }

  const connection = mongoose.connection;
  //db.onse('open', () => {});
  connection.on('open', console.info.bind(console, 'MongoDB connection established...'));
  connection.on('error', console.error.bind(console, 'MongoDB connection error: '));

  return connection;
}


export {
  connect as default,
  SuggestionModel,
  UserModel,
  PeriodModel,
}
