import http from 'http'

import logger from '../logger'

const reqLogger = logger.child({ label: 'http-request' })

const headers = {
	"Content-Type": "application/json; charset=utf-8"
}

const state = {
	up: false,
	lastUpdate: Date.now(),
	updateState: (isUp=false) => {
		state.up = isUp
		state.lastUpdate = Date.now()
	}
}

const requestHandler = (req, res) => {
	if(req.url == '/health') {
		res.writeHead(state.up ? 200 : 500, headers)
		res.end(JSON.stringify(state, null, 2))
	} else {
		res.writeHead(404, http.STATUS_CODES[404], {})
		res.end()
	}
	reqLogger.debug(`${res.statusCode} ${req.method} ${req.url}`)
}

const server = http.createServer(requestHandler)

export default {
	created: () => server.listen(3000),
	started: () => state.updateState(true),
	stopping: () => state.updateState(),
	stopped: () => state.updateState() && server.close()
}