const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

const Like = sequelize.define(
  "likes",
  {
    recordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Like;
