require('dotenv').config({ path: '.env.local' })
const { Sequelize, Model, DataTypes } = require('sequelize')

const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
});

class Blog extends Model { }
Blog.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	author: {
		type: DataTypes.TEXT,
	},
	url: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	title: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	likes: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	}
}, {
	sequelize,
	underscored: true,
	timestamps: true,
	modelName: 'blog'
})

Blog.sync()

app.get('/api/blogs', async (req, res) => {
	try {
		const blogs = await Blog.findAll()
		if (blogs) {
			blogs.map(blog => console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`))
		}
		console.log(JSON.stringify(blogs, null, 2))
		res.json(blogs)
	} catch (error) {
		console.error('Could not connect to db', error)
		res.status(404).end()
	}
})

app.post('/api/blogs', async (req, res) => {
	try {
		console.log(req.body)
		const blog = await Blog.create(req.body)
		res.json(blog)
	} catch (error) {
		console.error('Could not create blog', error)
		return res.status(400).json({ error })
	}

})

app.delete('/api/blogs/:id', async (req, res) => {
	try {
		const id = req.params.id
		const blogToDelete = await Blog.findByPk(id)
		if (blogToDelete) blogToDelete.destroy()
		res.json(blogToDelete)
	} catch (error) {
		console.error('Could not delete blog', error)
		res.status(404).end()
	}

})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.info(`Server running on port ${PORT}`)
})

