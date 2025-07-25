const router = require('express').Router()

const { User, Note } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const isAdmin = async (res, req, next) => {
	const user = await User.findByPk(req.decodedToken.id)
	if (!user.admin) {
		return res.status(403).json({ error: 'operation not allowed' })
	}
	next()
}

router.get('/', async (req, res) => {
	const users = await User.findAll({
		include: [
			{
				model: Note,
				attributes: { exclude: ['userId'] }
			},
		]
	})
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

router.get('/:id', async (req, res) => {
	const user = await User.findByPk(req.params.id, {
		attributes: { exclude: [''] },
		include: [{
			model: Note,
			attributes: { exclude: ['userId'] }
		},
		{
			model: Note,
			as: 'marked_notes',
			attributes: { exclude: ['userId'] },
			through: {
				attributes: []
			},
			include: {
				model: User,
				attributes: ['name']
			}
		},
		]
	})

	if (!user) {
		return res.status(404).end()
	}

	let teams = undefined
	if (req.query.teams) {
		teams = await User.getTeams({
			attributes: ['name'],
			joinTableAttributes: []
		})
	}
	res.json({ ...user.toJSON(), teams })
})

router.put('/:username', tokenExtractor, isAdmin, async (req, res) => {
	const user = await User.findOne({
		where: {
			username: req.params.username
		}
	})

	if (user) {
		user.disabled = req.body.disabled
		await user.save()
		res.json(user)
	} else {
		res.status(404).end()
	}
})

module.exports = router