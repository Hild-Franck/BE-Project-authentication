const consola = require('consola')

const init = require('./init')
const register = require('./register')
const auth = require('./auth')
const config = require('./config').redis

const logger = consola.withScope('db')

const database = {
	init: () => init(config).then(db => {
		database.register = register(db)
		database.auth = auth(db)
	}).catch(({ message }) => logger.error(message)),
	register: () => ({ then: cb => ( cb(), {catch: () => {}})}),
	auth: () => ({ then: cb => ( cb(), {catch: () => {}})}),
}

module.exports = database