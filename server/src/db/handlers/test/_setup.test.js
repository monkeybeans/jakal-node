import connect from '../../models';

before(() => {
  const BEFORE_DELAY_MS = 20;
  const resolve = res => () => {
    console.log(`# delayed ${BEFORE_DELAY_MS}ms for the connection setup...`);
    res();
  }

  connect();

  return new Promise(res => {
    setTimeout(resolve(res), BEFORE_DELAY_MS);
  });
});

after(() => {
  connect()
  .dropDatabase()
  .then(() => {
    connect().close();
    console.log(`# database is closed and dropped`);
  });
});
