import test from 'ava';
import {
  newSuggestionHTML,
  suggestionBeginHTML,
  votingBeginHTML,
  votingFinishHTML,
} from '../index';

test('Generating template from: newSuggestionHTML', t => {
  const name = 'NEW SUGGESTION NAME';
  const description = 'NEW DESCRIPTION';

  const html = newSuggestionHTML({
    name,
    description
  });

  t.regex(html, new RegExp(name));
  t.regex(html, new RegExp(description));
});

test('Generating template from: suggestionBeginHTML', t => {
  suggestionBeginHTML({});

  t.pass();
});

test('Generating template from: votingBeginHTML', t => {
  const name1 = 'NAME ONE';
  const name2 = 'NAME TWO';

  const html = votingBeginHTML({
    suggestions: [
      { name: name1 },
      { name: name2 },
    ]
  });

  t.regex(html, new RegExp(name1));
  t.regex(html, new RegExp(name2));
});

test('Generating template from: votingFinishHTML', t => {
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

  t.regex(html, new RegExp(name));
  t.regex(html, new RegExp(numOfVotes));
});
