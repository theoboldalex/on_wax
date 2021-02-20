const express = require("express");
const Record = require("../models/Record");
const router = express.Router();

// @route   GET /api/v1/records
// @desc    Get all records
// @access  Public
router.get("/", async (req, res) => {
  try {
    const records = await Record.findAll();

    res.status(200).json(records);
  } catch (err) {
    console.error(err.message);
  }
});

// @route   GET /api/v1/records/:id
// @desc    Get a record by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const record = await Record.findByPk(id);
    if (!record) {
      res.status(404).json({ msg: "No record found with that ID." });
    }
    res.status(200).json(record);
  } catch (err) {
    console.error(err.message);
  }
});

// @route   POST /api/v1/records
// @desc    Create a new record
// @access  Private
router.post("/", async (req, res) => {
  try {
    res.status(201).json({ msg: "Create a record" });
  } catch (err) {
    console.error(err.message);
  }
});

// @route   PUT /api/v1/records/:id
// @desc    Update a record
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    res.status(204).json({ msg: "Update a record" });
  } catch (err) {
    console.error(err.message);
  }
});

// @route   DELETE /api/v1/records/:id
// @desc    Delete a record
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    res.status(204).json({ msg: "Delete a record" });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
