const database = require('../database')

const registerRoute = app => app.post('/register', ({ body }, res) => {
	database.then(db => db.auth(body)).then(res.json)
})

module.exports = registerRoute