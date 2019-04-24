const appConfig = {
	name: 'be-project-auth',
	node_env: 'development',
	version: 'development',
	service: 'auth',
	nats_host: 'localhost'
}

const env = process.env

// Override config with env
Object.keys(appConfig).forEach(key => {
	const envKey = key.toUpperCase()
	if (env[envKey]) appConfig[key] = env[envKey]
})

export { appConfig }