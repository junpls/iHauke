const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  port: dev ? 8081 : 8080,
  stdOutLogLevel: 'silly',
  fileLogLevel: 'error'
};
