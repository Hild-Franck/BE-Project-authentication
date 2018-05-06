const consola = require('consola')
const database = require('../database')

const logger = consola.withScope('route.authentication')

const authRoute = app => app.post('/auth', ({ body }, res) => {
	logger.info("Request received for authentication")
	database.then(db => db.auth(body)).then(data => {
		res.json(data)
		res.end()
	}).catch(({ message }) => {
		logger.error(message)
	})
})

module.exports = authRoute