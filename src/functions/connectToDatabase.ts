import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const { DEV_DATABASE_URL, PROD_DATABASE_URL, ENVIROMENT } = process.env
const connectionDetails: any = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }

export const connectToDatabase = () => {
	const DATABASE_URL = ENVIROMENT === 'DEVELOPMENT' ? DEV_DATABASE_URL : PROD_DATABASE_URL
	try {
		mongoose.connect(DATABASE_URL, {})
		console.log('✔️  SUCCESSFULLY CONNECTED TO DATABASE..')
	} catch (error) {
		console.log('❌  ERROR OCCURED WHILE TRYING TO CONNECT TO THE DATABASE..')
		process.exit()
	}
}