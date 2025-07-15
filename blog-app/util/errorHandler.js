const errorHandler = (error, req, res, next) => {
	console.error('Error', error)
	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	}
	if (error.name === 'SequelizeDatabaseError') {
		console.error('Error', error.parent)
		return res.status(400).send({ error: error.parent })
	}
	if (error.name === 'SequelizeValidationError') {
		console.error('Error', error.errors[0].message)
		return res.status(400).send({ error: error.errors[0].message })
	}
	if (error.ValidationErrorItem) {
		console.error('Error', error.ValidationErrorItem.type)
		return res.status(400).send({ error: error.ValidationErrorItem.message })
	}
	next(error)
}

module.exports = errorHandler