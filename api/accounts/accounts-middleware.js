const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body
  const budgetNumber = Number(budget)
  
  if (name === undefined || budget === undefined) {
    res.status(400).json({message: 'name and budget are required'})
  } else {
      if (name.trim().length < 3 || name.trim().length > 100) {
        res.status(400).json({message: 'name of account must be between 3 and 100'})
      } else if (typeof budget !== 'number' || typeof budgetNumber !== 'number') {
        res.status(400).json({message: 'budget of account must be a number'})
      }else if (budgetNumber < 0 || budgetNumber > 1000000) {
        res.status(400).json({message: 'budget of account is too large or too small'})
      } else {
        req.newAcct = {name: name.trim(), budget}
        next()
      }
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const accounts = await Account.getAll()
    accounts.forEach(acc => {
      if (acc.name === req.body.name) {
        res.status(400).json({message: 'that name is taken'})
      }
    })
    next()
  } catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const valid = await Account.getById(req.params.id)
    if (!valid) {
      res.status(404).json({message: 'account not found'})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}
