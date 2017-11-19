const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();
const path = require('path');
const security = require('./api/helpers/security');
const util = require('./api/helpers/util');
const db = require('sqlite');
const conf = require('./api/config');
const expressWinston = require('express-winston');
const winston = require('winston');

module.exports = app; // for testing

// Logging
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      colorize: true
    })
  ],
  msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
  meta: false
}));

// Serve static files
app.use(express.static('../frontend/dist'));

var config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: security
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  // Serve index if path is unknown
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
  });

  var port = conf.port;

  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        colorize: true
      })
    ],
    msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    meta: false
  }));

  db.open('./api/database/ihauke.db', { cached: true })
    .then(() => {
      util.info('Connected to DB');
      return db.migrate();
    })
    .then(() => {
      util.info('Ready');
      app.listen(port);
    })
    .catch((err) => {
      util.error('Could not connect to DB');
      util.error(err);
    });
});
