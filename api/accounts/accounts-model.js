const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = async (id) => {
  return db('accounts').where('id', id).first()
}

const create = async (account) => {
  const [id] = await db('accounts').insert(account)
  return getById(id)
}

const updateById = async (id, account) => {
  const { name, budget } = account
  
  await db('accounts').where('id', id).update({name, budget})
  return getById(id)
}

const deleteById = async (id) => {
  const deletedAcc = await getById(id)
  await db('accounts').where('id', id).delete()
  return deletedAcc
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
