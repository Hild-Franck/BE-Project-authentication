import Sequelize from 'sequelize'

import auth from './auth'
import { dbConfig } from '../configs'
import logger from '../logger'

const dbLogger = logger.child({ label: 'database' })

const logError = error => {
	dbLogger.error("Unable to initialize database")
	dbLogger.error(error.message, { meta: {
		...dbConfig,
		postgres_password: 'xxxxx'
	} })
	process.exit(1)
}

const createSequelize = () => {
	try {
		return new Sequelize(
			dbConfig.database,
			dbConfig.postgres_user,
			dbConfig.postgres_password,
			{
				...dbConfig.options,
				logging: process.env.NODE_ENV === "development" ? dbLogger.debug : false
			}
		)
	} catch (error) {
		logError(error)
	}
}

const sequelize = createSequelize()

const database = {
	init: async () => {
		try {
			await sequelize.sync()
		} catch (error) {
			logError(error)
		}
		dbLogger.info(
			'Database initialized with the following config',
			{ meta: { ...dbConfig, postgres_password: 'xxxxx' } }
		)
	},
	auth: auth(sequelize)
}

export default database