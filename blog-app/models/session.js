const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Session extends Model { }

Model.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	token: {
		type: DataTypes.STRING,
	},
	userId: {
		type: DataTypes.INTEGER,
		references: { model: 'users', id: 'id' }
	}
}, {
	sequelize,
	timestamps: true,
	modelName: 'session',
	tableName: 'session',
	underscored: true,
})

module.exports = Session