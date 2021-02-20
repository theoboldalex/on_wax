const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Record = sequelize.define(
	"Record",
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		artist: {
			// TODO: Create artists table and relate on id
			type: DataTypes.STRING,
			allowNull: false,
		},
		catalog_number: {
			type: DataTypes.STRING,
		},
		diameter: {
			// 7", 10", 12"
			type: DataTypes.ENUM(["7", "10", "12"]),
			allowNull: false,
		},
		rpm: {
			// 33, 45, 78
			type: DataTypes.ENUM(["33", "45", "78"]),
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Record;
