const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.RECORD_COLLECTION_DB_CONN);

async function dbConn() {
  try {
    await sequelize.authenticate();
    console.log(
      `Successfully connected to DB ${sequelize.getDatabaseName()}...`.green
        .bold
    );
  } catch (error) {
    console.error(
      `There was a problem connecting to the DB: ${error.message}`.red.bold
    );
  }
}

module.exports = { sequelize, dbConn };
