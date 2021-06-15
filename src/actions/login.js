import { sha512 } from 'hash.js'
import { Errors } from 'moleculer'

import token from '../token.js'
import database from '../database'

const pepper = process.env.PEPPER || ""
const { MoleculerError } = Errors

const login = {
	params: {
		username: { type: 'string', min: 2 },
		password: { type: 'string', min: 8 }
	},
	handler: async ({ params: { username, password } }) => {
		const user = await database.auth.getUser(username)
		if (!user)
			throw new MoleculerError("User doesn't exist", 404, "NO_USER")
		const hash = `${user.salt}:${pepper}:${password}`
		if (sha512().update(hash).digest('hex') == user.password) {
			const newToken = token.create({ username: user.username, id: user.id })
			return { token: newToken }
		} else {
			throw new MoleculerError("Invalid password", 400, "WRONG_PASSWORD")
		}
	}
}

export { login }