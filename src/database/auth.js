const hash = require('hash.js')
const consola = require('consola')

const logger = consola.withScope('authentication')

const salt = "superjesus"

const auth = db => ({ username, password }) => new Promise((resolve, reject) => {
	if (!username || !password) {
		const message = "Incorrect login format"
		logger.error(message)				
		return resolve({ validation: false, message })
	}
	db.hgetallAsync(username).then(playerHash => {
		if (!playerHash) {
			const message = "Username doesn't exists"
			logger.error(message)
			return resolve({ validation: false, message })
		}
		const hashedPassword = hash.sha512().update(`${salt}:${password}`).digest("hex")
		if (hashedPassword != playerHash.password) {
			const message = `Wrong password for user ${username}`
			logger.error(message)
			return resolve({ validation: false, message })
		}
		const message = "Logged !"

		logger.success(`User ${username} logged !`)
		return resolve({ validation: true, message, playerData: playerHash })
	})
})

module.exports = auth