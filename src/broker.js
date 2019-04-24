import { ServiceBroker } from 'moleculer'

import { appConfig } from './configs'
import logger from './logger'
import service from './service'

const brokerLogger = logger.child({ label: "broker" })
const urls = [ `nats://${appConfig.nats_host}:4222` ]

const start = async () => {
	const broker = new ServiceBroker({
		logger: brokerLogger,
		requestRetry: 20,
		transporter: { type: "NATS", urls }
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