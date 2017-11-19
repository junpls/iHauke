'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
const util = require('util');
const db = require('./../helpers/sqlite');
const auth = require('basic-auth');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  hello: hello,
  fetchBoard: fetchBoard,
  fetchDebts: fetchDebts,
  createBoard: createBoard,
  createDebt: createDebt
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function hello(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  let name = req.swagger.params.name.value || 'stranger';
  let hello = util.format('Hello, %s!', name);
  // this sends back a JSON response which is a single string
  res.json(hello);
}

function fetchBoard(req, res, next) {
  let id = req.swagger.params.id.value;

  db.fetchBoard(id)
    .then(r => res.json(r)).catch(e => next(e));
}

function fetchDebts(req, res, next) {
  let id = req.swagger.params.id.value;
  let direction = req.swagger.params.direction.value;
  let count = req.swagger.params.count.value;
  let offset = req.swagger.params.offset.value;

  db.fetchDebts(id, direction, count, offset)
    .then(r => res.json(r)).catch(e => next(e));
}

function createBoard(req, res, next) {
  let users = req.swagger.params.body.value.users;
  let credentials = auth(req);

  if (users[0] === users[1]) {
    next({
      message: 'users must have different names',
      statusCode: 400
    });
    return;
  }

  db.createBoard(users, credentials.pass)
    .then(r => res.json(r)).catch(e => next(e));
}

function createDebt(req, res, next) {
  let id = req.swagger.params.id.value;
  let user = req.swagger.params.body.value.user;
  let gets = req.swagger.params.body.value.gets;
  let reason = req.swagger.params.body.value.reason;

  db.createDebt(id, user, gets, reason)
    .then(r => res.json(r)).catch(e => next(e));
}
