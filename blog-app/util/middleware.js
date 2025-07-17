const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const Session = require('../models/session')

const tokenExtractor = (req, res, next) => {
	const auth = req.get('authorization')
	if (auth && auth.toLowerCase().startsWith('bearer ')) {
		try { // Find Token
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

const checkTokenValid = async (req, res, next) => {
	try {
		const auth = req.get('authorization')
		const token = auth.substring(7)
		const match = await Session.findOne({ where: { token: token } })
		if (!match) {
			return res.status(401).json({ error: 'Session invalid' })
		}
		next()
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	}
}

module.exports = { tokenExtractor, checkTokenValid }