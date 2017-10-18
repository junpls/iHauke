'use strict';

const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();
const path = require('path');
const security = require('./api/helpers/security');
const util = require('./api/helpers/util');
const db = require('sqlite');

module.exports = app; // for testing

// Serve static files
app.use(express.static('dist'));

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
    res.sendFile(path.resolve(__dirname, 'dist/index.html'));
  });

  var port = process.env.PORT || 8080;

  db.open('./api/database/ihauke.db', { cached: true })
    .then(() => {
      util.info('Connected to DB');
      return db.migrate({ force: 'last' });
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
