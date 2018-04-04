const database = require('../database')

const registerRoute = app => app.post('/register', ({ body }, res) => {
	database.then(db => db.register(body)).then(data => {
		res.json(data)
		res.end()
	})
})

module.exports = registerRoute