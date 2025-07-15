const router = require('express').Router()
const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
	req.blog = await Blog.findByPk(req.params.id)
	next()

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

router.post('/', async (req, res) => {
	try {
		console.log(req.body)
		const blog = await Blog.create(req.body)
		res.json(blog)
	} catch (error) {
		console.error('Could not create blog', error)
		return res.status(400).json({ error })
	}

})

router.put('/:id', blogFinder, async (req, res) => {
	try {
		if (req.blog) {
			req.blog.likes = req.body.likes
			await req.blog.save()
			res.json(req.blog.likes)
		}
	} catch (error) {
		console.error('Could not update blog', error)
		res.status(404).json({ error })
	}
})

router.delete('/:id', blogFinder, async (req, res) => {
	try {
		if (req.blog) req.blog.destroy()
		res.json(req.blog)
	} catch (error) {
		console.error('Could not delete blog', error)
		res.status(404).end()
	}

})

module.exports = router