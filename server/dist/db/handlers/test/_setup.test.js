'use strict';

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

before(() => {
  const BEFORE_DELAY_MS = 20;
  const resolve = res => () => {
    console.log(`# delayed ${BEFORE_DELAY_MS}ms for the connection setup...`);
    res();
  };

  (0, _models2.default)();

  return new Promise(res => {
    setTimeout(resolve(res), BEFORE_DELAY_MS);
  });
});

after(() => {
  (0, _models2.default)().dropDatabase().then(() => {
    (0, _models2.default)().close();
    console.log(`# database is closed and dropped`);
  });
});