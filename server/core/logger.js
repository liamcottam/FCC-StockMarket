const winston = require('winston');

const transports = [];

transports.push(new winston.transports.Console({
  level: process.env.LOGLEVEL,
  colorize: true,
  prettyPrint: true,
  handleExceptions: process.env.NODE_ENV === 'production',
}));

const logger = new winston.Logger({
  level: 'debug',
  transports,
  exitOnError: false,
});

module.exports = logger;
