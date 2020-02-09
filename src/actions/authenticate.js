import database from '../database'
import jwt from '../token'

const authenticate = {
	params: {
		token: { type: 'string' },
	},
	handler: async ({ params: { token } }) => {
		const payload = jwt.verify(token)
		const user = await database.auth.getUserById(payload.username, payload.id)

		if (!user) throw new Error("Invalid username for token")

		return user.toObject()
	}
}

export { authenticate }