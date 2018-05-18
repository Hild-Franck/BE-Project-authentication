const ava = require('ava')
const hash = require('hash.js')

const createAuth = require('../src/database/auth')

const salt = "superjesus"
const rightPassword = "baguette"

const db = {
	hgetallAsync: username => {
		return {
			then: cb => {
				return username == "jesus"
					? cb("")
					: cb({ password: hash.sha512().update(`${salt}:${rightPassword}`).digest("hex")})
			}
		}
	}
}

const auth = createAuth(db)

ava("invalid format if no password or no no username", t => {
	return auth({username:"pouet", password:""}).then(data => {
		t.is(data.validation, false)
		t.is(data.message, "Incorrect login format")
	})
})

ava("username error if username provided does't match", t => {
	return auth({username:"jesus", password: "raptor"}).then(data => {
		t.is(data.validation, false)
		t.is(data.message, "Username doesn't exists")
	})
})

ava("wrong password provided", t => {
	return auth({username:"poulet", password: "oui"}).then(data => {
		t.is(data.validation, false)
		t.is(data.message, "Wrong password for user poulet")
	})
})

ava("right password provided", t => {
	return auth({username:"poulet", password: rightPassword}).then(data => {
		t.is(data.validation, true)
		t.is(data.message, "Logged !")
	})
})