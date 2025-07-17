const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

app.use(express.json());

const BlogsRouter = require('./controller/blogs')
const UsersRouter = require('./controller/users')
const LoginRouter = require('./controller/login')
const LogoutRouter = require('./controller/logout')
const AuthorsRouter = require('./controller/authors')
const ReadingListRouter = require('./controller/readinglists')

app.use('/api/blogs', BlogsRouter)
app.use('/api/users', UsersRouter)
app.use('/api/authors', AuthorsRouter)
app.use('/api/login', LoginRouter)
app.use('/api/readinglists', ReadingListRouter)
app.use('/api/logout', LogoutRouter)

const start = async () => {
	await connectToDatabase()
	app.listen(PORT, () => {
		console.info(`Server running on port ${PORT}`)
	})
}

start()

