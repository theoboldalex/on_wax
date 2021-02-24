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
      catalogNumber,
      diameter,
      rpm,
    } = req.body;

    const record = await Record.create({
      title,
      artist,
      label,
      year,
      catalogNumber,
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
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      artist,
      label,
      year,
      catalogNumber,
      diameter,
      rpm,
    } = req.body;

    const record = await Record.update(
      {
        title,
        artist,
        label,
        year,
        catalogNumber,
        diameter,
        rpm,
      },
      { where: { userId: req.user.id, id }, returning: true }
    );

    const serviceResponse = new ServiceResponse();

    if (!record || record[0] === 0) {
      serviceResponse.success = false;
      serviceResponse.message = `Record with ID ${id} could not be updated. Either it does not exist or you do not have permission to edit this resource.`;
      res.status(400).json(serviceResponse);
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
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Record.findOne(
      { where: { userId: req.user.id, id } },
      { returning: true }
    );

    const serviceResponse = new ServiceResponse();

    if (!record || record.userId !== req.user.id) {
      serviceResponse.success = false;
      serviceResponse.message = `Record with ID ${id} could not be deleted. Either it does not exist or you do not have permission to destroy this resource.`;
      res.status(400).json(serviceResponse);
    }

    await record.destroy();

    serviceResponse.message = "This resource has successfully been deleted.";
    res.status(200).json(serviceResponse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

module.exports = router;
