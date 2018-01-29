import {
  addSuggestion,
  getFreshSuggestions,
  voteOnSuggestion,
} from '../suggestions';

import { SuggestionModel } from '../../models';

describe('handlers.dynamics', () => {
  afterEach(() => SuggestionModel.remove());

  it('inserts an suggestion', async () => {
    const name = `apan apansson ${Date.now()}`;
    const description = 'monkeing aroud in the djungle';

    const result = await addSuggestion(name, description);

    expect(result.name).to.be.equal(name);
    expect(result.description).to.be.equal(description);
  });

  it('get the fresh suggestions', async () => {
    const today = new Date();
    const settings = {
      period_suggest_start_day: today.getDate() - 1,
    };

    await addSuggestion('name1', 'description1');
    await addSuggestion('name2', 'description2');
    await addSuggestion('name3', 'description3');

    const result = await getFreshSuggestions({ settings, today });

    expect(result).to.have.lengthOf(3);
  })

  it('votes on a suggestion', async () => {
    const suggestion = await addSuggestion('name1', 'description1');
    const result = await voteOnSuggestion(suggestion._id);

    expect(result.voting.num_of_votes).to.be.equal(1);
  });
});
