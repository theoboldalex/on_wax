"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("follows", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      followerId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      followingId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable("follows");
  },
};
