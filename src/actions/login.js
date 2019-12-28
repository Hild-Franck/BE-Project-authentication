import { sha512 } from 'hash.js'

import token from '../token.js'
import database from '../database'

const pepper = process.env.PEPPER || ""

const login = {
	params: {
		username: { type: 'string', min: 3 },
		password: { type: 'string', min: 8 }
	},
	handler: async ({ params: { username, password } }) => {
		const user = await database.auth.getUser(username)
		if (!user) throw new Error("User doesn't exist")
		const hash = `${user.salt}:${pepper}:${password}`
		if (sha512().update(hash).digest('hex') == user.password) {
			const newToken = token.create({ username: user.username, id: user._id })
			return { ...user.toObject(), token: newToken }
		} else {
			throw new Error("Invalid password")
		}
	}
}

export { login }