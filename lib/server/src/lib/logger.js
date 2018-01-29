const createPrologue = level => {
  const twoDigits = digit => ('0' + digit).slice(-2);
  const now = new Date();
  const YY = `${now.getFullYear()}`.substring(2,4);
  const MM = twoDigits(`${now.getMonth() + 1}`);
  const DD = twoDigits(`${now.getDate()}`);
  const hh = twoDigits(`${now.getHours()}`);
  const mm = twoDigits(`${now.getMinutes()}`);

  const time = `${YY}.${MM}.${DD}-${hh}:${mm}`;
  return `#[${time}][${level}] `;
};

const FG_RED = "\x1b[31m";
//const BG_RED = "\x1b[41m";
const COLOR_RESET = "\x1b[0m";

const consoleWrap = (level, COLOR_START) => (...args) => {
  const start = COLOR_START || '';
  const end = COLOR_START ? COLOR_RESET : '';
  console.log.apply(console, [start, createPrologue(level), ...args, end]);
}

const logger = consoleWrap('INFO');
logger.debug = consoleWrap('~ DEBUG ~');
logger.error = consoleWrap('ERROR', FG_RED);

export default logger;
