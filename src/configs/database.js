import { overrideConfig } from '../utils'

const config = {
	database: 'pikachu',
	postgres_user: 'pikachu',
	postgres_password: 'jesus',
	options: {
		dialect: "postgres",
		host: "localhost",
		port: "5432",
		operatorsAliases: false,
	}
}

const dbConfig = overrideConfig(config)

dbConfig.options.host = process.env.POSTGRES_HOST || dbConfig.options.host

export { dbConfig }