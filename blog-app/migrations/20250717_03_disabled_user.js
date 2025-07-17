const { DataTypes } = require('sequelize')

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.addColumn('users', 'disabled', {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		})
		await queryInterface.createTable('session', {
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			token: {
				type: DataTypes.STRING,
			},
			user_id: {
				type: DataTypes.INTEGER,
				references: { model: 'users', id: 'id' }
			},
			created_at: {
				type: DataTypes.DATE,
			},
			updated_at: {
				type: DataTypes.DATE,
			}
		})
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.removeColumn('users', 'disabled')
		await queryInterface.dropTable('session')
	}
}