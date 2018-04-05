const init = require('./init')
const register = require('./register')
const auth = require('./auth')
const config = require('./config')

const database = init(config).then(db => ({
	register: register(db),
	auth: auth(db)

}))

module.exports = database