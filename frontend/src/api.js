import SourceOfTruth from '@/sourceOfTruth'
import Vue from 'vue'
import Axios from 'axios'
import config from '@/config'
import querystring from 'querystring'

const axios = Axios.create({
  baseURL: `${config.api.scheme}://${config.api.host}${config.api.basePath}`
})

function convertDates (debts, name) {
  debts.forEach((d) => {
    d[name] = new Date(d[name])
  })
}

export function setAuth (board, password) {
  SourceOfTruth.boards[board].auth = {
    username: board,
    password: password
  }
  window.localStorage.setItem('pw_' + board, password)
}

export async function createBoard (users, password) {
  let response = await axios.request({
    url: '/boards',
    method: 'post',
    data: {
      id: 'new',
      users: users
    },
    auth: {
      username: '',
      password: password
    }
  })
  if (response.status !== 200) {
    return {}
  }
  let board = response.data
  Vue.set(SourceOfTruth.boards, board.id, board)
  setAuth(board.id, password)

  return board
}

export async function fetchBoard (id) {
  let response = await axios.request({
    url: `/boards/${id}`,
    method: 'get',
    auth: SourceOfTruth.boards[id].auth
  })

  let board = response.data
  convertDates(board.debts, 'timestamp')

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
  let params = {
    direction: dir,
    count: count,
    offset: offset
  }
  let response = await axios.request({
    url: `/boards/${id}/debts?${querystring.stringify(params)}`,
    method: 'get',
    auth: SourceOfTruth.boards[id].auth
  })
  if (response.status === 404) {
    console.log('board not found')
  }
  if (response.status !== 200) {
    return {}
  }
  let debts = response.data
  convertDates(debts, 'timestamp')

  debts.forEach(d => {
    if (SourceOfTruth.boards[id].debts.every(e => e.timestamp !== d.timestamp)) {
      SourceOfTruth.boards[id].debts.push(d)
    }
  })

  console.log(debts)

  return debts
}

export async function createDebt (id, user, gets, reason) {
  let response = await axios.request({
    url: `/boards/${id}/debts`,
    method: 'post',
    data: {
      user: user,
      gets: gets,
      reason: reason,
      timestamp: new Date()
    },
    auth: SourceOfTruth.boards[id].auth
  })
  if (response.status !== 200) {
    return {}
  }
  let debt = response.data
  convertDates([debt], 'timestamp')

  SourceOfTruth.boards[id].debts.unshift(debt)
  if (user === 0) {
    SourceOfTruth.boards[id].balance += debt.gets
  } else {
    SourceOfTruth.boards[id].balance -= debt.gets
  }

  return debt
}
