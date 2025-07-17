
const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const BlogsRouter = require('./controller/blogs')
const UsersRouter = require('./controller/users')
const LoginRouter = require('./controller/login')
const AuthorsRouter = require('./controller/authors')
const ReadingListRouter = require('./controller/readinglists')

app.use(express.json())
app.use('/api/blogs', BlogsRouter)
app.use('/api/users', UsersRouter)
app.use('/api/authors', AuthorsRouter)
app.use('/api/login', LoginRouter)
app.use('/api/readinglists', ReadingListRouter)

const start = async () => {
	await connectToDatabase()
	app.listen(PORT, () => {
		console.info(`Server running on port ${PORT}`)
	})
}

start()

