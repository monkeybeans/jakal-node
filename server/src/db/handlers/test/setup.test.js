import connect from '../../models';

before(() => {
  const BEFORE_DELAY_MS = 20;
  const resolve = res => () => {
    console.log(`Delayed ${BEFORE_DELAY_MS} for the connection setup...`);
    res();
  }

  connect();

  return new Promise(res => {
    setTimeout(resolve(res), BEFORE_DELAY_MS);
  });
});

after(() => connect().close());
