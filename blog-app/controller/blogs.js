const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { Blog, User } = require('../models')
const errorHandler = require('../util/errorHandler')
const { SECRET } = require('../util/config')

const blogFinder = async (req, res, next) => {
	req.blog = await Blog.findByPk(req.params.id)
	next()
}

const tokenExtractor = (req, res, next) => {
	const auth = req.get('authorization')
	if (auth && auth.toLowerCase().startsWith('bearer ')) {
		try {
			console.log(auth.substring(7))
			req.decodedToken = jwt.verify(auth.substring(7), SECRET)
			console.log(req.decodedToken.id)
		} catch {
			return res.status(401).json({ error: 'Token invalid' })
		}
	} else {
		return res.status(401).json({ error: 'Token missing' })
	}
	next()
}

router.get('/', async (req, res) => {
	try {
		const blogs = await Blog.findAll({
			include: {
				model: User,
				attributes: { exclude: ['userId'] }
			}
		})
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

router.post('/', tokenExtractor, async (req, res, next) => {
	try {
		const user = await User.findByPk(req.decodedToken.id)
		const blog = await Blog.create({ ...req.body, userId: user.id })
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

router.delete('/:id', tokenExtractor, blogFinder, async (req, res, next) => {
	try {
		const user = await User.findByPk(req.decodedToken.id)
		console.log(user.id, req.blog.userId)
		if (user.id !== req.blog.userId) return res.status(403).json({ error: "User not authorized" })
		if (req.blog) req.blog.destroy()
		res.json(req.blog)
	} catch (error) {
		next(error)
	}

})

router.use(errorHandler)

module.exports = router