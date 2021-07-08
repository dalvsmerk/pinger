const { setupLogger } = require('./logging');

watchServiceStatus('https://www.google.com/');

function watchServiceStatus(url) {
  const logger = setupLogger();

  logger.debug(`Pinging ${url} service`);
}
