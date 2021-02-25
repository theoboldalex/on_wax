const { DataTypes } = require("sequelize/types");
const { sequelize } = require("../config/db");

const Follow = sequelize.define("follows", {
  followerId: {
    type: DataTypes.INTEGER,
  },
  followingId: {
    type: DataTypes.INTEGER,
  },
});
