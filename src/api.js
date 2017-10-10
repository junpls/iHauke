// import * as util from './util'
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

export async function createBoard (users, password) {
  let response = await axios.request({
    url: '/boards',
    method: 'post',
    data: {
      id: 'new',
      users: users
    }
  })
  if (response.status !== 200) {
    return {}
  }
  let board = response.data

  Vue.set(SourceOfTruth.boards, board.id, board)

  return board
}

export async function fetchBoard (id) {
  let response = await axios.get(`/boards/${id}`)
  if (response.status === 404) {
    console.log('board not found')
  }
  if (response.status !== 200) {
    console.error(response)
    return {}
  }
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
  let response = await axios.get(`/boards/${id}/debts?${querystring.stringify(params)}`)
  if (response.status === 404) {
    console.log('board not found')
  }
  if (response.status !== 200) {
    return {}
  }
  let debts = response.data
  convertDates(debts, 'timestamp')

  debts.forEach(d => {
    // if (SourceOfTruth.boards[id].debts.every(e => e.timestamp !== d.timestamp)) {
    SourceOfTruth.boards[id].debts.push(d)
   // }
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
    }
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
