const consola = require('consola')

const init = require('./init')
const register = require('./register')
const auth = require('./auth')
const config = require('./config')

const logger = consola.withScope('authenticate')

const database = init(config).then(db => ({
	register: register(db),
	auth: auth(db)
})).catch(({ message }) => {
	logger.error(message)
})

module.exports = database