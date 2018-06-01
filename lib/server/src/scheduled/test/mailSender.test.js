import {
  sendMailSuggest,
  sendMailVote,
  sendMailDisplay,
  sendMailToUserNotVoted,
} from '../mailSenders';

describe('Creates a correct mail', () => {
  it('sendMailSuggest sends correct template', () => {
    const allUserMails = ['mail1@test.com', 'mail2@test.com'];

    const res = sendMailSuggest({ allUserMails });
    console.log('# ', res);
  });

  it('sendMailVote sends correct template', () => {
    const allUserMails = ['mail1@test.com', 'mail2@test.com'];
    const freshSuggestions = [
      {
        name: 'suggestion A',
        description: 'description A',
      },
      {
        name: 'suggestion B',
        description: 'description B',
      }
    ];

    const res = sendMailVote({ allUserMails, freshSuggestions });
    console.log('# ', res);
  });

  it('sendMailDisplay sends correct template one endorsed', () => {
    const allUserMails = ['mail1@test.com', 'mail2@test.com'];
    const freshSuggestions = [
      {
        name: 'suggestion A',
        description: 'description A',
        voting: {
          num_of_votes: 5,
          is_endorsed: true,
        },
      },
      {
        name: 'suggestion B',
        description: 'description B',
        voting: {
          num_of_votes: 2,
          is_endorsed: false,
        },
      }
    ];

    const res = sendMailDisplay({ allUserMails, freshSuggestions });
    console.log('# ', res);
  });

  it('sendMailDisplay sends correct template multiple endorsed', () => {
    const allUserMails = ['mail1@test.com', 'mail2@test.com'];
    const freshSuggestions = [
      {
        name: 'suggestion A',
        description: 'description A',
        voting: {
          num_of_votes: 5,
          is_endorsed: true,
        },
      },
      {
        name: 'suggestion B',
        description: 'description B',
        voting: {
          num_of_votes: 5,
          is_endorsed: true,
        },
      }
    ];

    try {
      sendMailDisplay({ allUserMails, freshSuggestions });
      expect('here a error').to.be.equal(' should have been thrown...');
    } catch(e) {
      expect(e.message).to.match(/More then one endorsed suggestion found/);
    }
  });

  it('sendMailToUserNotVoted sends correct template', () => {
    const users = [{
      username: 'apan apansson',
      emails: ['apa@test.com', 'banan@test.com'],
    }];

    const freshSuggestions = [
      {
        name: 'suggestion A',
        description: 'description A',
      },
      {
        name: 'suggestion B',
        description: 'description B',
      }
    ];

    const res = sendMailToUserNotVoted({ users, freshSuggestions });
    console.log('# ', res);
  });
});
