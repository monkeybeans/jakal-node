import {
  getUser,
  getEmailSendList,
  register,
  isSessionValid,
  touchSession,
  getPublicUserData,
} from '../users';

import { UserModel } from '../../models';

describe('handlers.users', () => {
  afterEach(() => UserModel.remove());

  it('get a non existing user', async () => {
    const result = await getUser({password: '12345', username: 'non_existing'});

    expect(result).to.be.equal(null);
  });

  it('registers a user', async () => {
    const result = await register({
      username: 'new_user',
      password: '12345678',
      email: 'banan@test.com',
    });

    expect(result.username).to.be.equal('new_user');
    expect(result.password.length).to.be.equal(60);
    expect(result.password).not.to.be.equal('12345678');
    expect(result.emails).to.be.eql(['banan@test.com']);
  })

  it('get the registred user', async () => {
    await register({
      username: 'new_user',
      password: '123456',
      email: 'banan@test.com',
    });

    const result = await getUser({
      username: 'new_user',
      password: '123456',
    });

    expect(result.username).to.be.equal('new_user');
    expect(result.password.length).to.be.equal(60);
    expect(result.password).not.to.be.equal('123456');
    expect(result.emails).to.be.eql(['banan@test.com']);
  });

  it('returns the public user data', async () => {
    const session = 'abcdef-123';
    const username = 'existing_user';
    await register({
      username,
      password: '123456',
      email: 'banan@test.com',
    });

    await touchSession({
      username,
      session,
    });

    return getPublicUserData(session)
    .then(data => {
      expect(Object.keys(data)).to.have.members(['username', 'lastVoting']);
    });
  });

  it('updates the session', async () => {
    const result = await register({
      username: 'new_user',
      password: '12345678',
      email: 'banan@test.com',
    });

    await touchSession({
      username: result.username,
      session: 'abc'
    });

    return UserModel
    .findOne({ username: result.username})
    .then(({ session }) => {
      expect(session).to.be.equal('abc');
    });
  });

  it('validates a session', async () => {
    const session = 'FFaaCCddd123';

    const result = await register({
      username: 'new_user',
      password: '12345678',
      email: 'banan@test.com',
    });

    await isSessionValid(session)
    .then(valid => {
      expect(valid).to.be.false();
    })

    await touchSession({
      username: result.username,
      session,
    });

    await isSessionValid(session)
    .then(valid => {
      expect(valid).to.be.true();
    })
  });
});
