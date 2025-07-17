const Blog = require('./blog')
const ReadingList = require('./reading_list')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'blogs_read' })
Blog.belongsToMany(User, { through: ReadingList, as: 'users_reading' })

module.exports = {
	Blog,
	User,
	ReadingList
}