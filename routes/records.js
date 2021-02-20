const express = require("express");
const { sequelize } = require("../config/db");
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
      res.status(404).json({ msg: `No record found with id ${id}` });
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
    const {
      title,
      artist,
      label,
      year,
      catalog_number,
      diameter,
      rpm,
    } = req.body;

    const record = await Record.create({
      title,
      artist,
      label,
      year,
      catalog_number,
      diameter,
      rpm,
    });

    if (!record) {
      res.status(400).json({ msg: "This record could not be created" });
    }

    res.status(201).json(record);
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
    const { id } = req.params;

    const record = await Record.findByPk(id);
    await record.destroy();

    res.status(200).json();
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
