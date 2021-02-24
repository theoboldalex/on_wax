const express = require("express");
const Record = require("../models/Record");
const router = express.Router();
const auth = require("../middleware/auth.js");
const ServiceResponse = require("../ServiceResponse");

// @route   GET /api/v1/records
// @desc    Get all records
// @access  Public
router.get("/", async (req, res) => {
  try {
    const records = await Record.findAll();

    const serviceResponse = new ServiceResponse(records);

    res.status(200).json(serviceResponse);
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

    const serviceResponse = new ServiceResponse();

    if (!record) {
      serviceResponse.success = false;
      serviceResponse.message = `No record found with id ${id}`;

      res.status(404).json(serviceResponse);
    }

    serviceResponse.data = record;

    res.status(200).json(serviceResponse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   GET /api/v1/records/:user
// @desc    Get all of a user's records
// @access  Public
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const records = await Record.findAll({ where: { userId } });

    const serviceResponse = new ServiceResponse();
    if (!records) {
      serviceResponse.success = false;
      serviceResponse.message = "No records found for that user.";
      res.status(400).json(serviceResponse);
    }

    serviceResponse.data = records;
    res.status(200).json(serviceResponse);
  } catch (err) {
    console.error(err.messgae);
    res.status(500).send("Server error");
  }
});

// @route   POST /api/v1/records
// @desc    Create a new record
// @access  Private
router.post("/", auth, async (req, res) => {
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
      userId: req.user.id,
    });

    const serviceResponse = new ServiceResponse();

    if (!record) {
      serviceResponse.success = false;
      serviceResponse.message = "This record could not be created";
      res.status(400).json(serviceResponse);
    }

    serviceResponse.data = record;

    res.status(201).json(serviceResponse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   PUT /api/v1/records/:id
// @desc    Update a record
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      artist,
      label,
      year,
      catalog_number,
      diameter,
      rpm,
    } = req.body;

    const record = await Record.update(
      {
        title,
        artist,
        label,
        year,
        catalog_number,
        diameter,
        rpm,
      },
      { where: { id }, returning: true }
    );

    const serviceResponse = new ServiceResponse();

    if (!record) {
      serviceResponse.success = false;
      serviceResponse.message = `No record found with id ${id}.`;
      res.status(404).json(serviceResponse);
    }

    // record[0] = num rows effected
    // record[1] = updated records
    serviceResponse.data = record[1];
    res.status(200).json(serviceResponse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   DELETE /api/v1/records/:id
// @desc    Delete a record
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Record.destroy({ where: { id } });

    res.status(200).json();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

module.exports = router;
