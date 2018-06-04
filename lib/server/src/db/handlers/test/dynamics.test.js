import {
  addSuggestion,
  getFreshSuggestions,
  voteOnSuggestion,
  addDefaultSuggestions,
} from '../suggestions';
import {
  register,
  touchSession,
} from '../users';

import { SuggestionModel, UserModel } from '../../models';

describe('handlers.dynamics', () => {
  afterEach(() => Promise.all([
    SuggestionModel.remove(),
    UserModel.remove(),
  ]));

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
    await register({ username: 'apan', email: 'no-reply@guldschakalen.se', password: 'banan1234567'});
    const { session } = await touchSession({ username: 'apan', session: 'session-id-123456789'});

    const suggestion = await addSuggestion('name1', 'description1');
    const result = await voteOnSuggestion({suggestionId: suggestion._id, session, });

    expect(result.voting.num_of_votes).to.be.equal(1);
  });

  it('sets a default suggestion', async () => {
    const { name, description } = await addDefaultSuggestions();

    expect(name).to.be.equal('Spara Potten');
    expect(description).to.match(/När marknaden inte lämpar.*/);
  });

  it('throws if voting double time', async () => {
    await register({ username: 'apan', email: 'no-reply@guldschakalen.se', password: 'banan1234567'});
    const { session } = await touchSession({ username: 'apan', session: 'session-id-123456789'});

    const suggestion = await addSuggestion('name1', 'description1');
    await voteOnSuggestion({suggestionId: suggestion._id, session, });

    try {
      await voteOnSuggestion({suggestionId: suggestion._id, session, });
      expect('reached here').to.be.equal(' and we failed test');
    } catch(e) {
      expect(e.message).to.be.equal(`Voting is not allowed for session: ${session}`);
    }
  });

});
