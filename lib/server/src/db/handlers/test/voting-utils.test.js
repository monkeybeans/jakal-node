import { SuggestionModel } from '../../models';
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
  afterEach(() => SuggestionModel.remove());

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
});
