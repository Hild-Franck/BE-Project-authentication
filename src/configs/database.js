const dbConfig = {
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

const env = process.env

// Override config with env
Object.keys(dbConfig).forEach(key => {
	const envKey = key.toUpperCase()
	if (env[envKey]) dbConfig[key] = env[envKey]
})

dbConfig.options.host = env.POSTGRES_HOST
	? env.POSTGRES_HOST
	: dbConfig.options.host

export { dbConfig }