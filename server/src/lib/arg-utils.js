import log from './logger';

export function parseArgs(args) {
  const parsed = args.reduce((parsed, arg) => {
    parsed[arg.split('=')[0]] = arg.split('=')[1];

    return parsed;
  }, {});

  return parsed;
}

export function loadSecret(path) {
  try {
    const secret = require(path);

    return secret;
  } catch (e) {
    log.error('Could not load secret: ', e.message);
    return {};
  }
}
