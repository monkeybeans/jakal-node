import log from '../lib/logger';
import MailSender from '../communication/MailSender';
import {
  suggestionBeginHTML,
  votingBeginHTML,
  votingFinishHTML,
  votingReminderHTML,
} from '../communication/templates';

const sendMailSuggest = ({ allUserMails }) => {
  const mail = new MailSender({
    to: allUserMails,
    subject: 'The new Suggestion Period has started',
    html: suggestionBeginHTML(),
  });

  return mail.send();
};

const sendMailVote = ({ allUserMails, freshSuggestions }) => {
  const mail = new MailSender({
    to: allUserMails,
    subject: 'Time to cast you vote',
    html: votingBeginHTML({ suggestions: freshSuggestions }),
  });

  return mail.send();
}

const sendMailDisplay = ({ allUserMails, freshSuggestions }) => {
  const freshEndorsed = freshSuggestions.filter(s => s.voting.is_endorsed);

  if (freshEndorsed.length <= 1) {
    const mail = new MailSender({
      to: allUserMails,
      subject: 'Vote period is over and the new investment is...',
      html: votingFinishHTML({ suggestion: freshEndorsed[0] }),
    });

    return mail.send();
  } else {
    const mail = new MailSender({
      to: allUserMails,
      subject: 'More than one suggestion got the most votes...:O',
      html: votingFinishHTML(),
    });

    mail.send();

    throw new Error(`More then one endorsed suggestion found: ${freshEndorsed}`);
  }
}

const sendMailToUserNotVoted = ({ users, freshSuggestions }) => {
  const sent = [];

  users.forEach(user => {
    const mail = new MailSender({
      to: user.emails,
      subject: 'It is time to vote...',
      html: votingReminderHTML({ username: user.username, suggestions: freshSuggestions }),
    });

    log(`Reminding user: ${user.username}, emails: ${user.emails.join(',')}`);

    sent.push(mail.send());
  });

  return sent;
}

export {
  sendMailSuggest,
  sendMailVote,
  sendMailDisplay,
  sendMailToUserNotVoted,
}
