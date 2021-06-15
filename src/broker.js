import { ServiceBroker } from 'moleculer'
import healthMiddleware from './middlewares/health-check'

import { appConfig } from './configs'
import logger from './logger'
import service from './service'

const brokerLogger = logger.child({ label: "broker" })

const start = async () => {
	const broker = new ServiceBroker({
		middlewares: [healthMiddleware],
		// logger: brokerLogger,
		requestRetry: 20,
		transporter: `nats://nats:4222`
	})

	broker.createService(service)

	try {
		await broker.start()
		brokerLogger.info('Running with the following config', { meta: appConfig })
	} catch(error) {
		brokerLogger.error(error.message)
	}
}

export { start }