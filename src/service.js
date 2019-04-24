import logger from './logger'
import { appConfig } from './configs'
import { register, login } from './actions'

const brokerLogger = logger.child({ label: "broker" })

const errorHandler = (ctx, err) => {
	brokerLogger.error(`[${ctx.action.name}] ${err.message}`)
	throw err
}

const service = {
	name: appConfig.service,
	actions: { register, login },
	hooks: {
		error: {
			"*": errorHandler
		}
	}
}



export default service