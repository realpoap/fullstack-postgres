
const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')
const { ReadingList } = require('../models')

router.post('/', async (req, res) => {
	try {
		const reading = await ReadingList.create({ userId: req.body.userId, blogId: req.body.blogId })
		res.status(200).json(reading)
	} catch (error) {
		res.status(401).send(error)
	}
})

router.put('/:id', tokenExtractor, async (req, res) => {
	try {
		const reading = await ReadingList.findOne({ where: { id: req.params.id } })
		if (req.decodedToken.id === reading.userId) {
			reading.read = req.body.read
			reading.save()
			res.status(200).json(reading)
		} else {
			res.status(403).json({ error: 'operation unauthorized' })
		}

	} catch (error) {
		res.status(401).send(error)
	}
})

module.exports = router
