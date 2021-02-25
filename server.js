const express = require("express");
const app = express();
const { sequelize, dbConn } = require("./config/db.js");
const colors = require("colors");
const Record = require("./models/Record.js");
const User = require("./models/User");
require("dotenv").config();

app.use(express.json());

// Connect to DB
dbConn();

// Create Records table on server start -> TESTING ONLY
// Record.sync({ alter: true })
//   .then((done) => console.log("Table created"))
//   .catch((err) => console.error(err));

// User.sync({ alter: true })
//   .then((done) => console.log("Table created"))
//   .catch((err) => console.error(err));

// Routes
app.use("/api/v1/records", require("./routes/records"));
app.use("/api/v1/users", require("./routes/users.js"));
app.use("/api/v1/auth", require("./routes/auth.js"));
app.use("/api/v1/followers", require("./routes/follow.js"));

// Serve
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server listening on port ${PORT}...`.cyan.bold));
