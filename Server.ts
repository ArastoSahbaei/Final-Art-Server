import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import { connectToDatabase } from './src/configurations/functions/connectToDatabase'
import { connectToPort } from './src/configurations/functions/connectToPort'
import webSocketServer from 'websocket'
import http from 'http'
import { getUniqueID } from './src/configurations/functions/getUniqueID'
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

wsServer.on('request', function (request) {
	const userID = getUniqueID()
	console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.'+ `ID: ${userID}`)


	// You can rewrite this part of the code to accept only the requests from allowed origin
	const connection = request.accept(null, request.origin)
	clients[userID] = connection
	/* console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients)) */

	connection.on('message', function (message) {
		if (message.type === 'utf8') {
		/* 	console.log('Received Message: ', message.utf8Data) */

			// broadcasting message to all connected clients
			for (const key in clients) {
				clients[key].sendUTF(message.utf8Data)
			}
		}
	})

})


connectToDatabase()
connectToPort(application)


