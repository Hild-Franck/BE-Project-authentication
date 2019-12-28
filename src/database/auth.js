import path from 'path'
import crypto from 'crypto'
import { sha512 } from 'hash.js'

const pepper = process.env.PEPPER || ""

const auth = sequelize => {
	const User = sequelize.import(path.join(__dirname, "/models/User"))
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
		getUserById: (username, _id) => User.findOne({ where: { username, _id } }),
		deleteUser: username => User.destroy({ where: { username } })
	}
}

export default auth