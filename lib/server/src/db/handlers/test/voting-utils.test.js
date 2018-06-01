import { SuggestionModel, UserModel } from '../../models';
import {
  resolveEndorsedInPeriod } from '../voting-utils';
import {
  addSuggestion,
  voteOnSuggestion,
} from '../suggestions';
import {
  register,
  touchSession,
} from '../users';

describe('handlers.votingUtils', () => {
  afterEach(() => Promise.all(
    [
      SuggestionModel.remove(),
      UserModel.remove(),
    ]
  ));

  it('Picks out the winner for the latest voting round', async () => {
    const today = new Date();
    const settings = {
      period_suggest_start_day: today.getDate() - 1,
    };

    await register({ username: 'apan', email: 'no-reply@guldschakalen.se', password: 'banan1234567'});
    const { session } = await touchSession({ username: 'apan', session: 'session-id-123456789'});

    const ss = await addSuggestion('nameA', 'descriptionA')
    .then(() => addSuggestion('nameB', 'descriptionB'))
    .then(() => addSuggestion('name1', 'description1'))
    .then(() => addSuggestion('name2', 'description2'));

    await voteOnSuggestion({ suggestionId: ss._id, session});

    return resolveEndorsedInPeriod({ settings, today })
    .then(() => SuggestionModel.find( { 'voting.is_endorsed': true }))
    .then(ss => {
      expect(ss).to.have.lengthOf(1);
      expect(ss[0].name).to.be.equal('name2');
    });
  });

  it('Picks out the winners for the voting round', async () => {
    const today = new Date();
    const settings = {
      period_suggest_start_day: today.getDate() - 1,
    };

    await register({ username: 'apan', email: 'no-reply1@guldschakalen.se', password: 'banan1234567'});
    const { session: session1 } = await touchSession({ username: 'apan', session: 'session-id-123456789'});

    await register({ username: 'bananen', email: 'no-reply2@guldschakalen.se', password: 'banan1234567'});
    const { session: session2 } = await touchSession({ username: 'bananen', session: 'session-id-4567888999'});

    const ss = await Promise.all([
      addSuggestion('nameA', 'descriptionA'),
      addSuggestion('nameB', 'descriptionB'),
      addSuggestion('name1', 'description1'),
      addSuggestion('name2', 'description2'),
    ]);


    await voteOnSuggestion({ suggestionId: ss[0]._id, session: session1});
    await voteOnSuggestion({ suggestionId: ss[1]._id, session: session2});

    return resolveEndorsedInPeriod({ settings, today })
    .then(() => SuggestionModel.find( { 'voting.is_endorsed': true }))
    .then(ss => {
      expect(ss).to.have.lengthOf(2);
      expect(ss[0].name).to.be.equal('nameA');
      expect(ss[1].name).to.be.equal('nameB');
    });
  });
});
