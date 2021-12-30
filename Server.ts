import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import { connectToDatabase } from './src/configurations/functions/connectToDatabase'
import { connectToPort } from './src/configurations/functions/connectToPort'
import webSocketServer from 'websocket'
import http from 'http'
/* import cors from 'cors' */

const application = express()
/* application.use(cors({ credentials: true })) */
application.use(express.json())
application.use(helmet())
application.use(morgan('common'))


const server = http.createServer()
server.listen(8000)

const wsServer = new webSocketServer.server({
	httpServer: server
})

const clients = {}

const getUniqueID = () => {
	const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
	return s4() + s4() + '-' + s4()
}

wsServer.on('request', function (request) {
	const userId = getUniqueID()
	console.log((new Date()) +  'Recieved a new connection from origin ' + request.origin + '.')

	const connection = request.accept(null, request.origin)
	clients[userId] = connection
	console.log('connected' + userId + 'in' + Object.getOwnPropertyNames(clients))

	connection.on('message', function(message) {
		if(message.type === 'utf8') {
			console.log('Received message: ', message.utf8Data)

			for(const key in clients) {
				clients[key].sendUTF(message.utf8Data)
				console.log('sent message to: ', clients[key])
			}
		}
	})

})


connectToDatabase()
connectToPort(application)


