const createPrologue = level => {
  const now = new Date();
  const YY = `${now.getFullYear()}`.substring(2,4);
  const MM = `${now.getMonth() + 1}`;
  const DD = `${now.getDate()}`;
  const hh = `${now.getHours()}`;
  const mm = `${now.getMinutes()}`;

  const time = `${YY}.${MM}.${DD}-${hh}:${mm}`;
  return `#[${time}][${level}] `;
};

const consoleWrap = level => (...args) => console.log.apply(console, [createPrologue(level), ...args]);

const logger = consoleWrap('INFO');
logger.debug = consoleWrap('DEBUG');
logger.error = consoleWrap('*ERROR*');

export default logger;
