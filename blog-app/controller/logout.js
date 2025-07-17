const router = require('express').Router()
const Session = require('../models/session')
const { tokenExtractor, checkTokenValid } = require('../util/middleware')

router.delete('/', tokenExtractor, checkTokenValid, async (req, res) => {
	try {
		await Session.destroy({ where: { userId: req.decodedToken.id } })
		console.info('session ended')
		res.status(200).end()
	} catch (error) {
		res.status(500).send(error)
	}
})

module.exports = router