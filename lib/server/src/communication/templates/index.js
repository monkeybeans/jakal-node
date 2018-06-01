import Handlebars from 'handlebars';
import fs from 'fs';
import pathUtil from 'path';
import log from '../../lib/logger';

const SITE_URL = process.env.SITE_URL || 'http://localhost';

const loadSource = path => {
  try {
    return fs.readFileSync(pathUtil.resolve(__dirname, path), { encoding: 'utf8' });
  } catch (e) {
    log.error('Could not load path: ', path);
    log.error(e);
  }

  return null;
};

const creaatehtml = (template, context) => {
  const source = loadSource(template);
  const extendedContext = Object.assign({}, context, {
    SITE_URL
  });

  return Handlebars.compile(source)(extendedContext);
};

export const newSuggestionHTML = context => creaatehtml('./newSuggestion.hbs', context);
export const suggestionBeginHTML = context => creaatehtml('./suggestionBegin.hbs', context);
export const votingBeginHTML = context => creaatehtml('./votingBegin.hbs', context);
export const votingFinishHTML = context => creaatehtml('./votingFinish.hbs', context);
export const votingReminderHTML = context => creaatehtml('./votingReminder.hbs', context);
