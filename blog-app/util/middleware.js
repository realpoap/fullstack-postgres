const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

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

module.exports = { tokenExtractor }