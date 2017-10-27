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

const consoleWrap = level => (...args) => console.log.apply(console, [createPrologue(level), ...args]);

const logger = consoleWrap('INFO');
logger.debug = consoleWrap('~ DEBUG ~');
logger.error = consoleWrap('** ERROR **');

export default logger;
