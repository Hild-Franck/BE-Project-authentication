const consola = require('consola')
const database = require('../database')

const logger = consola.withScope('route.registration')

const registerRoute = app => app.post('/register', ({ body }, res) => {
	logger.info("Request received for registration")
	database.then(db => db.register(body)).then(data => {
		res.json(data)
		res.end()
	}).catch(({ message }) => {
		logger.info(message)
	})
})

module.exports = registerRoute