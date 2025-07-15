const router = require('express').Router()
const { User } = require('../models')

const userFinder = async (req, res, next) => {
	req.user = await User.findOne({ username: req.params.username })
	next()
}

router.get('/', async (req, res) => {
	const users = await User.findAll()
	res.json(users)
})

router.post('/', async (req, res) => {
	try {
		const user = await User.create(req.body)
		res.json(user)
	} catch (error) {
		return res.status(400).json({ error })
	}

})

router.put('/:username', userFinder, async (req, res) => {
	req.user.username = req.body.username
	await req.user.save()
	res.json(req.user)
})

module.exports = router