import { map } from 'lodash'

const env = map(process.env, key => key.toUpperCase())

const overrideConfig = config => Object.keys(config).reduce((newConfig, key) => {
	newConfig[key] = env[env] || config[key]
	return newConfig
}, {})

export { overrideConfig }