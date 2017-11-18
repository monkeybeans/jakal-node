'use strict';

var _users = require('../users');

var _models = require('../../models');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe('handlers.users', () => {
  afterEach(() => _models.UserModel.remove());

  it('get a non existing user', _asyncToGenerator(function* () {
    const result = yield (0, _users.getUser)({ password: '12345', username: 'non_existing' });

    expect(result).to.be.equal(null);
  }));

  it('registers a user', _asyncToGenerator(function* () {
    const result = yield (0, _users.register)({
      username: 'new_user',
      password: '12345678',
      email: 'banan@test.com'
    });

    expect(result.username).to.be.equal('new_user');
    expect(result.password.length).to.be.equal(60);
    expect(result.password).not.to.be.equal('12345678');
    expect(result.emails).to.be.eql(['banan@test.com']);
  }));

  it('get the registred user', _asyncToGenerator(function* () {
    yield (0, _users.register)({
      username: 'new_user',
      password: '123456',
      email: 'banan@test.com'
    });

    const result = yield (0, _users.getUser)({
      username: 'new_user',
      password: '123456'
    });

    expect(result.username).to.be.equal('new_user');
    expect(result.password.length).to.be.equal(60);
    expect(result.password).not.to.be.equal('123456');
    expect(result.emails).to.be.eql(['banan@test.com']);
  }));

  it('updates the session', _asyncToGenerator(function* () {
    const result = yield (0, _users.register)({
      username: 'new_user',
      password: '12345678',
      email: 'banan@test.com'
    });

    yield (0, _users.touchSession)({
      username: result.username,
      session: 'abc'
    });

    return _models.UserModel.findOne({ username: result.username }).then(function ({ session }) {
      expect(session).to.be.equal('abc');
    });
  }));

  it('validates a session', _asyncToGenerator(function* () {
    const session = 'FFaaCCddd123';

    const result = yield (0, _users.register)({
      username: 'new_user',
      password: '12345678',
      email: 'banan@test.com'
    });

    yield (0, _users.isSessionValid)(session).then(function (valid) {
      expect(valid).to.be.false();
    });

    yield (0, _users.touchSession)({
      username: result.username,
      session
    });

    yield (0, _users.isSessionValid)(session).then(function (valid) {
      expect(valid).to.be.true();
    });
  }));
});