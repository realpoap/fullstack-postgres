const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')

router.post('/', async (req, res) => {
	const body = req.body

	const user = await User.findOne({
		where: {
			username: body.username
		}
	})

	console.log('user:', user)

	const passwordOk = body.password === 'password'

	if (!(body && passwordOk)) {
		return res.status(401).json({
			error: 'Invalid credentials'
		})
	}

	const userObject = {
		username: user.username,
		id: user.id
	}

	console.info('User for token:', userObject)

	const token = jwt.sign(userObject, SECRET)
	res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router