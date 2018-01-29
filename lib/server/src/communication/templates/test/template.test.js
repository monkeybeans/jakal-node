import {
  newSuggestionHTML,
  suggestionBeginHTML,
  votingBeginHTML,
  votingFinishHTML,
} from '../index';

describe('html template', () => {
  it('Generating template from: newSuggestionHTML', () => {
    const name = 'NEW SUGGESTION NAME';
    const description = 'NEW DESCRIPTION';

    const html = newSuggestionHTML({
      name,
      description
    });

    expect(html).to.match(new RegExp(name));
    expect(html).to.match(new RegExp(description));
  });

  it('Generating template from: suggestionBeginHTML', () => {
    expect(suggestionBeginHTML).not.to.throw();
  });

  it('Generating template from: votingBeginHTML', () => {
    const name1 = 'NAME ONE';
    const name2 = 'NAME TWO';

    const html = votingBeginHTML({
      suggestions: [
        { name: name1 },
        { name: name2 },
      ]
    });

    expect(html).to.match(new RegExp(name1));
    expect(html).to.match(new RegExp(name2));
  });

  it('Generating template from: votingFinishHTML', () => {
    const name = 'ENDORSED NAME';
    const numOfVotes = 547;

    const html = votingFinishHTML({
      suggestion: {
        name,
        voting: {
          num_of_votes: numOfVotes
        },
      }
    });

    expect(html).to.match(new RegExp(name));
    expect(html).to.match(new RegExp(numOfVotes));
  });
});
