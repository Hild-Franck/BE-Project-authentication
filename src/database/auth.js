import crypto from 'crypto'
import { sha512 } from 'hash.js'

import createUserModel from './models/User'

const pepper = process.env.PEPPER || ""

const auth = sequelize => {
	const User = createUserModel(sequelize)
	return {
		checkUserExist: username => User.findOne({ where: { username } }),
		createUser: async (username, password) => {
			const salt = crypto.randomBytes(16).toString('hex')
			return User.create({
				salt,
				username,
				password: sha512().update(`${salt}:${pepper}:${password}`).digest('hex')
			})
		},
		getUser: username => User.findOne({ where: { username } }),
		getUserById: (username, id) => User.findOne({ where: { username, id } }),
		deleteUser: username => User.destroy({ where: { username } })
	}
}

export default auth