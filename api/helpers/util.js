const win = require('winston');
const conf = require('./../config');
const Int52 = require('./Int52');

const winston = new (win.Logger)({
  transports: [
    new (win.transports.Console)({
      colorize: true,
      level: conf.stdOutLogLevel
    }),
    new (win.transports.File)({
      filename: 'error.log',
      level: conf.fileLogLevel
    })
  ]
});

function silly(...args) {
  winston.silly(...args);
}
function verbose(...args) {
  winston.verbose(...args);
}
function debug(...args) {
  winston.debug(...args);
}
function info(...args) {
  winston.info(...args);
}
function warn(...args) {
  winston.warn(...args);
}
function error(...args) {
  winston.error(...args);
}

function hexTo(num) {
  return num.toString(16);
}

function hexFrom(str) {
  return parseInt(str, 16);
}

function uuid() {
  // With 45 bits we can encode the UNIX time for more than another 1000 years
  // The remaining 52-45=7 bits are a random portion.
  // Duplicates are _pretty_ unlikely
  let ms = new Date().getTime();
  let rand = Math.floor(Math.random() * (Math.pow(2, 7) - 1));
  let id = new Int52(rand);
  id.setBits(7, ms);
  return id.numeric;
}

const HTTP_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 500
};

module.exports = {
  silly: silly,
  verbose: verbose,
  debug: debug,
  info: info,
  warn: warn,
  error: error,
  hexFrom: hexFrom,
  hexTo: hexTo,
  HTTP_CODES: HTTP_CODES,
  uuid: uuid
};
