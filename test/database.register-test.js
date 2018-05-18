const ava = require('ava')
const hash = require('hash.js')

const createRegister = require('../src/database/register')

const db = {
	hlenAsync: username => {
		return {
			then: cb => {
				return username == "jesus"
					? cb(1)
					: cb(0)
			}
		}
	},
	hmsetAsync: () => ({
		then: cb => {
			return cb()
		}
	})
}

const register = createRegister(db)

ava("invalid format if no password or no no username", t => {
	return register({username:"pouet", password:""}).then(data => {
		t.is(data.validation, false)
		t.is(data.message, "Incorrect login format")
	})
})

ava("username error if username already used", t => {
	return register({username:"jesus", password: "raptor"}).then(data => {
		t.is(data.validation, false)
		t.is(data.message, "Username jesus already exist")
	})
})

ava("username stored", t => {
	return register({username:"chuck", password: "raptor"}).then(data => {
		t.is(data.validation, true)
		t.is(data.message, "User chuck created ! :)")
	})
})
