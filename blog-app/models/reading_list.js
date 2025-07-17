const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class ReadingList extends Model { }

ReadingList.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: { model: 'users', id: 'id' }
	},
	blogId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: { model: 'blogs', id: 'id' }
	},
	read: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
}, {
	sequelize,
	timestamps: false,
	underscored: true,
	modelName: 'reading_list',
	tableName: 'reading_list',
})

module.exports = ReadingList