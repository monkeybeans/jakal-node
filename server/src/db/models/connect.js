import mongoose from 'mongoose';
import log from '../../lib/logger';

const isInTestEnv = process.env.NODE_ENV === 'test';

let connection = null;

const connect = (/*, username, password */) => {
  if (connection) return connection;

  mongoose.Promise = global.Promise || Promise;
  //const query = Object.keys(options).map(k => `k=options[k]`).join(',');
  //mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}?${query}`);

  const getUri = (useTestUri) => {
    if (useTestUri) {
      log('# using test database #');
      return 'mongodb://localhost/jakal_testing';
    } else {
      return 'mongodb://localhost/jakal';
    }
  }

  connection = mongoose.createConnection(
    getUri(isInTestEnv),
    //{ useMongoClient: true, /* to avoid warning :[] */ }
  );

  //mongoose.connection;
  //db.onse('open', () => {});
  connection.on('open', () => {
    log('MongoDB connection established');
  });

  connection.on('close', () => {
    log('MongoDB connection closed');
    connection = null;
  });

  connection.on('error', () => {
    log('MongoDB connection error: ');
    connection = null;
  });

  return connection;
}

export {
  connect as default,
}
