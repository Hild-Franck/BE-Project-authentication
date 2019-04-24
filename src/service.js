import logger from './logger'
import { appConfig } from './configs'
import register from './actions/register'
import login from './actions/login'

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