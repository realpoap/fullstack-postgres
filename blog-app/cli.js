require('dotenv').config({ path: '.env.local' })
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
});

const main = async () => {
	try {
		await sequelize.authenticate()
		const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
		if (blogs) {
			blogs.map(blog => console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`))
		}
		sequelize.close()
	} catch (error) {
		console.error('COuld not connect to db', error)
	}
}

main()