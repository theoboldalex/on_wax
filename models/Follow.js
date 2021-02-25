const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Follow = sequelize.define(
  "follows",
  {
    followerId: {
      type: DataTypes.INTEGER,
    },
    followingId: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false }
);

module.exports = Follow;
