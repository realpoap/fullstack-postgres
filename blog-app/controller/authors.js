const router = require('express').Router()
const { Blog } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
	try {
		const authors = await Blog.findAll({
			attributes: [
				'author',
				[sequelize.fn('COUNT', sequelize.col('title')), 'n_blogs'],
				[sequelize.fn('SUM', sequelize.col('likes')), 'n_likes']
			],
			group: 'author',
			order: [
				['n_likes', 'DESC']
			]
		})
		res.json(authors)
	} catch (error) {
		res.status(400).json({ error })
	}

})

module.exports = router