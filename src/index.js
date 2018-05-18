const http = require('http')
const express = require('express')
const bodyParser = require("body-parser")
const consola = require('consola')

const routes = require('./routes')
const database = require('./database')

const logger = consola.withScope("main")

database.init()

const app = express()
app.use(bodyParser.json())

routes(app)

const port = process.env.PORT || 4242

const server = http.createServer(app)
server.listen(port, () => logger.info(`Server is listening on port ${port}`))
