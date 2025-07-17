const { ReadingList } = require('../models')

const router = require('express').Router()

router.post('/', async (req, res) => {
	try {
		const reading = await ReadingList.create({ userId: req.body.userId, blogId: req.body.blogId })
		res.status(200).json(reading)
	} catch (error) {
		res.status(401).send(error)
	}
})

module.exports = router
