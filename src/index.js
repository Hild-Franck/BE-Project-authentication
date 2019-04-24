import { start } from './broker'
import database from './database'

(async () => {
	await database.init()
	start()
})()
