const winston = require('winston');

function setupLogger() {
  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    defaultMeta: { service: 'pinger' },
    transports: [
      // Winston does not support separate file transports withing one logger
      // TODO: Implement wrapper that would run separate instances of logger for each severity level
      new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
    ],
  });
}

module.exports = { setupLogger };
