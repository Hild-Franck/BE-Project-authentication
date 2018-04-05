const hash = require('hash.js')

const logger = require('../logger')

const salt = "superjesus"

const auth = db => ({ username, password }) => {
	if (!username || !password) {
		const message = "Incorrect login format"
		logger.error(message)				
		return { validation: false, message }
	}
	return db.hgetallAsync(username).then(playerHash => {
		if (!playerHash) {
			const message = "Username doesn't exists"
			logger.error(message)
			return { validation: false, message }
		}
		const hashedPassword = hash.sha512().update(`${salt}:${password}`).digest("hex")
		if (hashedPassword != playerHash.password) {
			const message = `Wrong password for user ${username}`
			logger.error(message)
			return { validation: false, message }
		}
		const message = "Logged !"

		logger.info(`User ${username} logged !`)
		return { validation: true, message, playerData: playerHash }
	})
}

module.exports = auth