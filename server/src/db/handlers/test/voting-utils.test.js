import { SuggestionModel } from '../../models';
import {
  getEndorsedSuggestions,
  startVoting,
  reolveSuggestionAsEndorsedAndRejected } from '../voting-utils';
import {
  addSuggestion,
  voteOnSuggestion,
} from '../suggestions';

describe('handlers.votingUtils', () => {
  afterEach(() => SuggestionModel.remove());

  it('Set start voting date for suggestions', async () => {
    await addSuggestion('name1', 'description1')
    .then(() => addSuggestion('name2', 'description2'))
    .then(() => startVoting());

    await addSuggestion('nameA', 'descriptionA')
    .then(() => addSuggestion('nameB', 'descriptionB'))
    .then(() =>
      startVoting()
      .then(s => {
        expect(s).to.have.lengthOf(2);
        expect(s[1].voting.condition).to.be.equal('LISTED');
      })
    );
  });

  it('Picks out the winner for the latest voting round', async () => {
    const ss = await addSuggestion('nameA', 'descriptionA')
    .then(() => addSuggestion('nameB', 'descriptionB'))
    .then(() => addSuggestion('name1', 'description1'))
    .then(() => addSuggestion('name2', 'description2'));

    await startVoting()
    .then(() => voteOnSuggestion(ss._id))
    .then(() => reolveSuggestionAsEndorsedAndRejected())
    .then(() => getEndorsedSuggestions())
    .then(ss => {
      expect(ss[0].name).to.be.equal('name2');
    });
  });
});
