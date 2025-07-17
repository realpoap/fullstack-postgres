const Blog = require('./blog')
const ReadingList = require('./reading_list')
const Session = require('./session')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasMany(Session)

User.belongsToMany(Blog, { through: ReadingList, as: 'blogs_read' })
Blog.belongsToMany(User, { through: ReadingList, as: 'users_reading' })

module.exports = {
	Blog,
	User,
	ReadingList,
	Session
}