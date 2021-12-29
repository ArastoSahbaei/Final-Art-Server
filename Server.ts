import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import { connectToDatabase } from './src/functions/connectToDatabase'
import { connectToPort } from './src/functions/connectToPort'
/* import cors from 'cors' */

const application = express()
/* application.use(cors({ credentials: true })) */
application.use(express.json())
application.use(helmet())
application.use(morgan('common'))

connectToDatabase()
connectToPort(application)