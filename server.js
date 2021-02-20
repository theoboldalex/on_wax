const { sequelize, dbConn } = require("./config/db.js");
const colors = require("colors");
const Record = require("./models/Record.js");

// Connect to DB
dbConn();

// Create Records table on server start -> TESTING ONLY
Record.sync({ force: true })
	.then((done) => {
		if (done) console.log("Table created");
	})
	.catch((err) => console.error(err));
