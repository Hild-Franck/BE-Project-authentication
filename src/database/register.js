const hash = require('hash.js')
const consola = require('consola')

const logger = consola.withScope('registration')

const salt = "superjesus"

const register = db => ({ username, password }) => new Promise((resolve, reject) => {
	if (!username || !password) {
		const message = "Incorrect login format"
		logger.error(message)
		return resolve({ validation: false, message })
	}
	db.hlenAsync(username).then(number => {
		if (number != 0) {
			const message = `Username ${username} already exist`
			logger.error(message)
			return resolve({ validation: false, message })
		}
		db.hmsetAsync(username,
			"username", username,
			"password", hash.sha512().update(`${salt}:${password}`).digest("hex")
		).then(() => {
			const message = `User ${username} created ! :)`
			logger.success(message)
			return resolve({ validation: true, message })
		})
	})
})

module.exports = register