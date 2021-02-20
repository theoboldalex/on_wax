const express = require("express");
const app = express();
const { sequelize, dbConn } = require("./config/db.js");
const colors = require("colors");
const Record = require("./models/Record.js");

app.use(express.json());

// Connect to DB
dbConn();

// Create Records table on server start -> TESTING ONLY
Record.sync({ force: true })
	.then((done) => {
		if (done) console.log("Table created");
	})
	.catch((err) => console.error(err));

// Routes
app.use("/api/v1/records", require("./routes/records"));

// Serve
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server listening on port ${PORT}...`.cyan.bold));
