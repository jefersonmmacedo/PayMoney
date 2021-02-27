const port = 3002
const express = require('express')
server = express()
const bodyParser = require('body-parser')
const Cors = require('./cors')
const cors = require('cors')
const queryParser = require('express-query-int')

server.use(Cors)
server.use(cors());
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(queryParser())

server.listen(port, (req, res) => {
    console.log(`Server successfully started on the port ${port}`)
})

module.exports = server;