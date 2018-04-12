const ava = require('ava')

const createAuthRoute = require('../src/routes/authRoute')
const createRegisterRoute = require('../src/routes/registerRoute')

const res = {
	check: 0,
	json: () => {},
	end: () => {
		res.check++
		if (res.resolve) res.resolve()
	}
}

const app = {
	check: {
		auth: false,
		register: false
	},
	post: (route, cb) => {
		if (route === "/auth") app.check.auth = true
		if (route === "/register") app.check.register = true
		if (app.resolve) res.resolve = app.resolve
		cb({body: ""}, res)
	}
}

ava.before(() => new Promise((resolve, reject) => {
	createAuthRoute(app)
	app.resolve = resolve
	createRegisterRoute(app)
}))

ava("auth route created", t => {
	t.is(app.check.auth, true)
})

ava("register route created", t => {
	t.is(app.check.register, true)
})

ava("routes respond to client", t => {
	t.is(res.check, 2)
})