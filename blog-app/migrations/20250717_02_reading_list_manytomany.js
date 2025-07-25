const { DataTypes } = require('sequelize')

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('reading_list', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'users', id: 'id' }
			},
			blog_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'blogs', id: 'id' }
			},
			read: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			}
		})
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('reading_list')
	}
}