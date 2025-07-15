
const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const BlogsRouter = require('./controller/blogs')

app.use(express.json())
app.use('/api/blogs', BlogsRouter)

const start = async () => {
	await connectToDatabase()
	app.listen(PORT, () => {
		console.info(`Server running on port ${PORT}`)
	})
}

start()

