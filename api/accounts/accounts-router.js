const router = require('express').Router()
const Account = require('./accounts-model')
const {checkAccountPayload, checkAccountNameUnique, checkAccountId} = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll()
    res.status(200).json(accounts)
  } catch (err){
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  Account.getById(req.params.id)
    .then(acc => {
      if (acc) {
        res.status(200).json(acc)
      } else {
        res.status(404).json({message: 'account not found'})
      }
    })
    .catch(err => {
      next(err)
    })
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  const {newAcct} = req
  Account.create(newAcct)
    .then(() => {
      res.status(201).json(newAcct)
    })
    .catch(err => next(err))
})

router.put('/:id',checkAccountId, checkAccountPayload, (req, res, next) => {
  Account.updateById(req.params.id, req.body)
    .then(updated => {
      res.status(200).json(updated)
    })
    .catch(() => next())
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Account.deleteById(req.params.id)
    .then(deletedAcc => {
      res.status(200).json(deletedAcc)
    })
    .catch(() => next())
})

module.exports = router;
