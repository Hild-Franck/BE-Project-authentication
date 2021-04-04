import { DataTypes } from 'sequelize'

const createUserModel = sequelize => {
	const User = sequelize.define("users", {
		username: { type: DataTypes.STRING, validate: { len: [3, 20] } },
		password: { type: DataTypes.STRING },
		salt: DataTypes.STRING
	}, {
		indexes: [{
			unique: true,
			fields: ['username']
		}],
		tableName: "users"
	})

	User.prototype.toObject = function() {
		const values = Object.assign({}, this.get())
		delete values.password
		delete values.salt

		return values
	}

	return User
}

export default createUserModel