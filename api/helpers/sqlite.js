import * as util from "./util"

export async function createBoard(users, password) {
  return {
    id: util.hexTo(123),
    users: users,
    balance: 0,
    debts: []
  }
}

export async function fetchBoard(id) {
  return {
    id: id,
    users: ['jan', 'fred'],
    balance: 42,
    debts: [
      {
        user: 0,
        gets: 42,
        reason: 'test',
        timestamp: new Date().toDateString()
      }
    ]
  }
}

export async function deleteBoard(id) {
}

export async function fetchDebts(id, dir, count, offset) {
  return [
    {
      user: 0,
      gets: 42,
      reason: 'test',
      timestamp: new Date().toDateString()
    }
  ]
}

export async function createDebt(id, user, gets, reason) {
  let now = new Date().toDateString()
  return {
    user: user,
    gets: gets,
    reason: reason,
    timestamp: now
  }
}
