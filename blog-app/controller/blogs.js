const router = require('express').Router()
const { application } = require('express')
const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
	req.blog = await Blog.findByPk(req.params.id)
	next()
}

const errorHandler = (error, req, res, next) => {
	//console.error('Error', error)
	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	}
	if (error.name === 'SequelizeDatabaseError') {
		console.error('Error', error.parent)
		return res.status(400).send({ error: error.parent })
	}
	if (error.ValidationErrorItem) {
		console.error('Error', error.ValidationErrorItem.type)
		return res.status(400).send({ error: error.ValidationErrorItem.message })
	}
	next(error)
}

router.get('/', async (req, res) => {
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

router.post('/', async (req, res, next) => {
	try {
		console.log(req.body)
		const blog = await Blog.create(req.body)
		res.json(blog)
	} catch (error) {
		next(error)
	}

})

router.put('/:id', blogFinder, async (req, res, next) => {
	try {
		if (req.blog) {
			req.blog.likes = req.body.likes
			await req.blog.save()
			res.json(req.blog.likes)
		}
	} catch (error) {
		next(error)
	}
})

router.delete('/:id', blogFinder, async (req, res, next) => {
	try {
		if (req.blog) req.blog.destroy()
		res.json(req.blog)
	} catch (error) {
		next(error)
	}

})

router.use(errorHandler)

module.exports = router