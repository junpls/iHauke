import * as util from './util'
import SourceOfTruth from '@/sourceOfTruth'
import Vue from 'vue'

export async function createBoard (users, password) {
  await util.sleep(2000)

  let board = {
    id: '2b7fa',
    users: users,
    balance: 0,
    debts: []
  }

  Vue.set(SourceOfTruth.boards, board.id, board)

  return board
}

export async function fetchBoard (id) {
  let board = {}

  if (id === 'janfred') {
    board = {
      id: 'janfred',
      users: ['jan', 'fred'],
      balance: 42,
      debts: [
        {
          user: 0,
          gets: 42,
          reason: 'test',
          timestamp: new Date()
        }
      ]
    }
  } else {
    board = SourceOfTruth.boards[id]
  }

  if (SourceOfTruth.boards.hasOwnProperty(id)) {
    Vue.util.extend(SourceOfTruth.boards[board.id], board)
  } else {
    Vue.set(SourceOfTruth.boards, board.id, board)
  }

  return board
}

export async function deleteBoard (id) {
  Vue.delete(SourceOfTruth.boards, id)
}

export async function fetchDebts (id, dir, count, offset) {
  await util.sleep(2000)

  let debt = [
    {
      user: 0,
      gets: Math.floor(Math.random() * 20),
      reason: 'test',
      timestamp: new Date()
    }
  ]

  for (let i = 1; i < count; i++) {
    debt.push(debt[0])
  }

  debt.forEach(d => {
    // if (SourceOfTruth.boards[id].debts.every(e => e.timestamp !== d.timestamp)) {
    SourceOfTruth.boards[id].debts.push(d)
   // }
  })

  console.log(debt)

  return debt
}

export async function createDebt (id, user, gets, reason) {
  await util.sleep(2000)
  let now = new Date()
  let debt = {
    user: user,
    gets: gets,
    reason: reason,
    timestamp: now
  }

  SourceOfTruth.boards[id].debts.unshift(debt)
  if (user === 0) {
    SourceOfTruth.boards[id].balance += gets
  } else {
    SourceOfTruth.boards[id].balance -= gets
  }

  return debt
}
