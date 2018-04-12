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
	const data = register({username:"pouet", password:""})
	t.is(data.validation, false)
	t.is(data.message, "Incorrect login format")
})

ava("username error if username already used", t => {
	const data = register({username:"jesus", password: "raptor"})
	t.is(data.validation, false)
	t.is(data.message, "Username already exist")
})

ava("username stored", t => {
	const data = register({username:"chuck", password: "raptor"})
	t.is(data.validation, true)
	t.is(data.message, "User created ! :)")
})
