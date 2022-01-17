const express = require("express");
const accountsRouter = require('./accounts/accounts-router')

const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouter)

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: err.message
    })
})

module.exports = server;
