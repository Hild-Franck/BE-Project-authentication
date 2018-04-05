const database = require('../database')

const authRoute = app => app.post('/auth', ({ body }, res) => {
	database.then(db => db.auth(body)).then(data => {
		res.json(data)
		res.end()
	})
})

module.exports = authRoute