'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
var path = require('path');
var security = require('./api/helpers/security');
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
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
