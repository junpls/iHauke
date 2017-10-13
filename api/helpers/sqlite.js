const util = require('./util');
const db = require('sqlite');
const bcrypt = require('bcrypt');

db.open(__dirname + './../database/ihauke.db', { cached: true }).then(() => {
  util.info('Connected to DB');
}).catch((err) => {
  util.error('Could not connect to DB');
  util.error(err);
});

function convertDebts(debt) {
  debt.timestamp = new Date(debt.time);
  delete debt.time;
}

async function fetchBoard(id) {
  let hex = util.hexFrom(id);
  let res = await db.get(`
SELECT b.*,SUM(case when user=0 then d.gets else (-d.gets) end) as balance, u.users
FROM (Board b LEFT JOIN Debt d ON b.id=d.board)
LEFT JOIN 
	(SELECT board, GROUP_CONCAT(name) as users FROM User where board=? ORDER BY num) u
ON b.id=u.board
WHERE b.id=?`, [hex, hex]);

  if (!res || res.id === null) {
    throw new Error({
      message: 'board not found',
      statusCode: 404
    });
  } else if (res.users === null) {
    throw new Error({
      message: 'no users in this board'
    });
  }

  return {
    id: id,
    users: res.users.split(','),
    balance: res.balance || 0,
    debts: []
  };
}

async function fetchDebts(id, direction, count, offset) {
  let res = await db.all(`
SELECT * FROM Debt WHERE board=? 
ORDER BY time DESC LIMIT ? OFFSET ?`, [util.hexFrom(id), count, offset]);

  res.forEach(convertDebts);

  return res;
}

async function createBoard(users, password) {
  let id = util.uuid();
  let creation = new Date().getTime();
  let hash = await _hash(password);
  await db.run('BEGIN TRANSACTION');
  await db.run('INSERT INTO Board (id, password, creation) VALUES (?,?,?)',
    [id, hash, creation]);
  await db.run('INSERT INTO User (name, board, num) VALUES (?,?,0),(?,?,1)',
    [users[0], id, users[1], id]);
  await db.run('COMMIT');

  return {
    id: util.hexTo(id),
    users: users,
    balance: 0,
    debts: []
  };
}

async function createDebt(id, user, gets, reason) {
  let res = await db.run(`
  INSERT INTO Debt (board, user, time, gets, reason)
  VALUES(?,?,?,?,?) `, [util.hexFrom(id), user, new Date().getTime(), gets, reason]);

  return {
    user: user,
    gets: gets,
    reason: reason,
    timestamp: new Date()
  };
}

async function _authorize(id, password) {
  let res = await db.get(
    `SELECT password FROM Board WHERE id=?`, [util.hexFrom(id)]);
  if (!await _compare(password, res.password)) {
    throw new Error({
      message: 'Wrong credentials',
      statusCode: 403
    });
  }
}

async function _hash(pw) {
  return await bcrypt.hash(pw, 10);
}

async function _compare(pw, hash) {
  return await bcrypt.compare(pw, hash);
}

module.exports = {
  fetchBoard: fetchBoard,
  fetchDebts: fetchDebts,
  createDebt: createDebt,
  createBoard: createBoard,
  _authorize: _authorize
};
