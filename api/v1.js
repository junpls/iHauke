import * as express from "express"
const router = express.Router()
import * as auth from "basic-auth"

import * as store from "./sqlite"
import * as util from "./util"

router.post('/boards', (req, res, next) => {
  let cred = auth(req)

  if (req.body.users.length !== 2) {
    res.status(util.HTTP_CODES.BAD_REQUEST).send()
  }

  store.createBoard(users, cred.pass)
    .then(res.status(util.HTTP_CODES.CREATED).send)
    .catch(next)
})

router.get('/boards/:id', (req, res, next) => {
  store.fetchBoard(req.params.id).then(res.send).catch(next)
})

router.delete('/boards/:id', (req, res, next) => {
  store.deleteBoard(req.params.id).then(res.send).catch(next)
})

router.get('/boards/:id/debts', (req, res, next) => {
  let direction = req.query.direction || 'desc'
  let count = parseInt(req.query.count || '20')
  if (count < 0) count = 0
  if (count > 50) count = 50
  let offset = parseInt(req.query.offset || '0')
  store.fetchDebts(req.params.id, direction, count, offset)
    .then(res.send).catch(next)
})

router.post('/boards/:id/debts', (req, res, next) => {
  store.createDebt(req.params.id,
    req.body.user,
    req.body.gets,
    req.body.reason)
    .then(res.status(util.HTTP_CODES.CREATED).send).catch(next)
})
