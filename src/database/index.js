const init = require('./init')
const register = require('./register')
const config = require('./config')

const database = init(config).then(db => ({
	register: register(db)
}))

module.exports = database