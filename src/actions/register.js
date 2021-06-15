import { Errors } from 'moleculer'

import database from '../database'

const { MoleculerError } = Errors

const register = {
	params: {
		username: { type: 'string', min: 3 },
		password: { type: 'string', min: 8 }
	},
	handler: async ({ params: { username, password } }) => {
		const userExist = await database.auth.checkUserExist(username)
		if (userExist) {
			throw new MoleculerError("User already exist", 409, "USER_EXISTS")
		}
		const user = await database.auth.createUser(username, password)
		return { username: user.username }
	}
}

export { register }