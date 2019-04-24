const userModel = (sequelize, DataTypes) => {
	const User = sequelize.define("user", {
		username: { type: DataTypes.STRING, validate: { len: [3, 20] } },
		password: { type: DataTypes.STRING },
		salt: DataTypes.STRING
	}, {
		indexes: [{
			unique: true,
			fields: ['username']
		}]
	})

	User.prototype.toObject = function() {
		const values = Object.assign({}, this.get())
		delete values.password
		delete values.salt

		return values
	}

	return User
}

export default userModel