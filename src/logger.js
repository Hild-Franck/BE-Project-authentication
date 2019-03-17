import winston from 'winston'

import { appConfig } from './configs'

const { combine, timestamp, prettyPrint, printf, align, colorize } = winston.format

const customLevels = {
	levels: { crit: 0, error: 1, warning: 2, info: 3, debug: 4 },
	colors: {crit:'red', error:'red', warning:'yellow', info:'white', debug:'grey'}
}

const logger = winston.createLogger({
	levels: customLevels.levels,
	level: process.env.LOG_LEVEL || 'info',
	transports: [new winston.transports.Console({
		format: combine(
			align(),
			timestamp(),
			printf(({ level, message, label, timestamp, meta }) => {
				const labelDisplay = label ? `[${label}]` : ""
				const infoDisplay = `[${timestamp}][${level.toUpperCase()}]${labelDisplay}`
				const metaDisplay = meta ? `\n${JSON.stringify(meta, null, 2)}` : ''
				return `${appConfig.name}.${appConfig.version} ${infoDisplay} ${message}${metaDisplay}`
			}),
			colorize({ all: true })
		)
	})],
	format: combine(
		timestamp(),
		prettyPrint()
	)
})

winston.addColors(customLevels.colors)

export default logger