const express = require("express");
const Record = require("../models/Record");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const records = await Record.findAll();

		res.status(200).json(records);
	} catch (err) {
		console.error(err.message);
	}
});

module.exports = router;
