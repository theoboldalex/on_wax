"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable("records", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      artist: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      label: Sequelize.DataTypes.STRING,
      year: Sequelize.DataTypes.INTEGER,
      catalogNumber: Sequelize.DataTypes.STRING,
      diameter: {
        allowNull: false,
        type: Sequelize.DataTypes.ENUM(["7", "10", "12"]),
      },
      rpm: Sequelize.DataTypes.ENUM(["33", "45", "78"]),
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.dropTable("records");
  },
};
