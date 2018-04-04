const http = require('http')
const express = require('express')
const bodyParser = require("body-parser")

const logger = require('../logger')
const routes = require('./routes')

const app = express()
app.use(bodyParser.json())

routes(app)

const port = process.env.PORT || 4242

const server = http.createServer(app)
server.listen(port, () => logger.info(`Server is listening on port ${port}`))
