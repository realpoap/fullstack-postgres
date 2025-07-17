const router = require('express').Router()
const { Blog, User } = require('../models')
const errorHandler = require('../util/errorHandler')
const { tokenExtractor, checkTokenValid } = require('../util/middleware')
const { Op } = require('sequelize')

const blogFinder = async (req, res, next) => {
	req.blog = await Blog.findByPk(req.params.id)
	next()
}


router.get('/', async (req, res) => {
	try {
		let where = {}
		if (req.query.search) {
			where = {
				[Op.or]: {
					title: {
						[Op.iLike]: `%${req.query.search}%`
					},
					author: {
						[Op.iLike]: `%${req.query.search}%`
					}
				}
			}
		}

		const blogs = await Blog.findAll({
			include: [{
				model: User,
				attributes: { exclude: ['userId'] }
			},
			{
				model: User,
				as: 'users_reading',
				attributes: { exclude: ['userId'] },
				through: {
					attributes: []
				},
				include: {
					model: Blog,
					attributes: ['title']
				}
			}
			],
			order: [
				['likes', 'DESC']
			],
			where
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

router.post('/', tokenExtractor, checkTokenValid, async (req, res, next) => {
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

router.delete('/:id', tokenExtractor, checkTokenValid, blogFinder, async (req, res, next) => {
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