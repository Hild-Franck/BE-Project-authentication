import database from '../database'

const register = {
	params: {
		username: { type: 'string', min: 3 },
		password: { type: 'string', min: 8 }
	},
	handler: async ({ params: { username, password } }) => {
		const userExist = await database.auth.checkUserExist(username)
		if (userExist) {
			throw new Error("User already exist")
		}
		const user = await database.auth.createUser(username, password)
		return user.toObject()
	}
}

export { register }