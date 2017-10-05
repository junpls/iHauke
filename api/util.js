import conf from "./conf";
import * as win from "winston"

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
})

export function silly(...args) {
  winston.silly(...args)
}
export function verbose(...args) {
  winston.verbose(...args)
}
export function debug(...args) {
  winston.debug(...args)
}
export function info(...args) {
  winston.info(...args)
}
export function warn(...args) {
  winston.warn(...args)
}
export function error(...args) {
  winston.error(...args)
}

export function hexFrom(num) {
  return num.toString(16)
}

export function hexTo(str) {
  return parseInt(hexString, 16)
}

export const HTTP_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 500
}
