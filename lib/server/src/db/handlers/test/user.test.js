import moment from 'moment';
import {
  getUser,
  getEmailSendList,
  getUsersNotVoted,
  register,
  isSessionValid,
  touchSession,
  getPublicUserData,
} from '../users';


import { UserModel } from '../../models';

describe('handlers.users', () => {
  afterEach(() => UserModel.remove());

  describe('create/get user', () => {
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
  });

  describe('user related data', () => {
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

    it('returns a list of user not voted', async () => {
      const votingStartDay = 15;
      const now = moment().date(votingStartDay + 5);
      const beforeVotePeriod = moment().date(votingStartDay - 5);

      await register({
        username: 'user_voted',
        password: '12345678',
        email: 'voted@test.com',
      });


      await register({
        username: 'user_not_voted',
        password: '12345678',
        email: 'not_voted@test.com',
      });

      await UserModel.findOneAndUpdate({
        username: 'user_voted'}, { $set: { lastVoting: now.toISOString() }
      });

      await UserModel.findOneAndUpdate({
        username: 'user_not_voted'}, { $set: { lastVoting: beforeVotePeriod.toISOString() }
      });

      const result = await getUsersNotVoted({ votingStartDay, now });

      expect(result).to.have.deep.members([
        { username: 'user_not_voted', emails: ['not_voted@test.com'] }
      ]);
    });
  });

  describe('user sessions', () => {
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
});
