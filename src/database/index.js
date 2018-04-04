const init = require('./init')
const register = require('./register')

const database = init().then(db => ({
	register: register(db)
}))

module.exports = database