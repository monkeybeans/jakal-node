import mongoose from 'mongoose';
import log from '../../lib/logger';
import { isProduction, isTest, isDevelopment, getEnvironment } from '../../lib/arg-utils';

let connection = null;

const connect = (/*, username, password */) => {
  if (connection) return connection;

  mongoose.Promise = global.Promise || Promise;
  //const query = Object.keys(options).map(k => `k=options[k]`).join(',');
  //mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}?${query}`);

  const getUri = () => {
    if (isTest()) {
      log('Using test database');
      return 'mongodb://localhost/jakal_testing';
    } else if (isDevelopment() || isProduction()) {
      log('Using production database');
      return 'mongodb://localhost/jakal';
    } else {
      throw new Error(`Unknown environment(${getEnvironment()}), could not descide monogo uri`);
    }
  }

  connection = mongoose.createConnection(getUri());

  //mongoose.connection;
  //db.onse('open', () => {});
  connection.on('open', () => {
    log('MongoDB connection established');
  });

  connection.on('close', () => {
    log('MongoDB connection closed');
    connection = null;
  });

  connection.on('error', (err) => {
    log.error('MongoDB connection error: ', err);
    connection = null;
  });

  return connection;
}

export {
  connect as default,
}
