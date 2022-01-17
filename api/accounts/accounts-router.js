const router = require('express').Router()
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  const accounts = await Account.getAll()
  res.status(200).json(accounts)
})

router.get('/:id', (req, res, next) => {
  Account.getById(req.params.id)
    .then(acc => {
      if (acc.length > 0) {
        res.status(200).json(acc)
      } else {
        res.status(404).json({message: 'could not find account'})
      }
    })
    .catch(err => {
      next(err)
    })
})

router.post('/', (req, res, next) => {
  const newPost = req.body
  Account.create(newPost)
    .then(acc => {
      res.status(200).json(newPost)
    })
    .catch(err => next(err))
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
