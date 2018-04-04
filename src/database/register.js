const hash = require('hash.js')

const logger = require('../logger')

const salt = "superjesus"

const register = db => ({ username, password }) => {
	if (!username || !password) {
		const message = "Incorrect login format"
		logger.error(message)
		return { validation: false, message }
	}
	return db.hlenAsync(username).then(number => {
		if (number != 0) {
			const message = "Username already exist"
			logger.error(message)
			return { validation: false, message }
		}
		return db.hmsetAsync(username,
			"username", username,
			"password", hash.sha512(`${salt}:${password}`).digest("hex")
		).then(() => {
			const message = "User created ! :)"
			logger.info(message)
			return { validation: true, message }
		})
	})
}

module.exports = register