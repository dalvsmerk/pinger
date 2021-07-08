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
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
      new winston.transports.File({ filename: 'logs/debug.log', level: 'debug' }),
      new winston.transports.File({ filename: 'logs/combined.log' }), // else levels
    ],
  });
}

module.exports = { setupLogger };
