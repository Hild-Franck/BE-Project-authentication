import { overrideConfig } from '../utils'

const config = {
	name: 'be-project-auth',
	node_env: 'development',
	version: 'development',
	service: 'auth',
	nats_host: 'nats'
}

const appConfig = overrideConfig(config)

export { appConfig }