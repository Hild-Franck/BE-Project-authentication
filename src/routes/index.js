const registerRoute = require('./registerRoute')
const authRoute = require('./authRoute')

const routes = app => {
	registerRoute(app)
	authRoute(app)
}

module.exports = routes