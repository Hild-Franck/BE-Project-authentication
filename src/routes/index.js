const registerRoute = require('./registerRoute')

const routes = app => {
	registerRoute(app)
}

module.exports = routes