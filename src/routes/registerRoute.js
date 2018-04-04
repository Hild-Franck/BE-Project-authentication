const database = require('../database')

const registerRoute = app => app.post('/register', ({ body }, res) => {
	database.then(db => db.register(body)).then(res.json)
})

module.exports = registerRoute