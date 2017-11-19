const util = require('./util');
const auth = require('basic-auth');
const sqlite = require('./sqlite');

module.exports = {

  basicAuth(req, authOrSecDef, scopesOrApiKey, cb) {
    let credentials = auth(req);
    if (!credentials) {
      cb(new Error({
        message: 'No credentials',
        statusCode: 401
      }));
      return;
    }
    sqlite._authorize(credentials.name, credentials.pass)
      .then(cb)
      .catch(cb);
  }
};
