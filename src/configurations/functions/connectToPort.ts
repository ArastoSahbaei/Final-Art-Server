import dotenv from 'dotenv'

dotenv.config()
const { PORT } = process.env

export const connectToPort = async (application) => {
	try {
		await application.listen(PORT || 3001, () => {
			console.log(`✔️  SERVER IS RUNNING ON PORT: ${PORT || 3001}`)
		})
	} catch (error) {
		console.log('❌  ERROR OCCURED WHILE TRYING TO CONNECT TO THE PORT..')
	}
}