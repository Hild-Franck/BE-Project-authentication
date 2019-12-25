import database from '../database'
import { sha512 } from 'hash.js'

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
			return user.toObject()
		} else {
			throw new Error("Invalid password")
		}
	}
}

export { login }