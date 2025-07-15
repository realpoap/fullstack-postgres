require('dotenv').config({ path: '.env.local' })

module.exports = {
	DATABASE_URL: process.env.DATABASE_URL,
	PORT: process.env.PORT || 3001,
}