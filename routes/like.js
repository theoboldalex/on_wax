const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const ServiceResponse = require("../ServiceResponse.js");
const Like = require("../models/Like.js");

// @route   POST /api/v1/likes/like/:id
// @desc    Like a record by id
// @access  Private
router.post("/like/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const like = await Like.findOrCreate({
      where: {
        recordId: id,
        userId: req.user.id,
      },
    });

    const serviceResponse = new ServiceResponse();

    if (!like[1]) {
      serviceResponse.success = false;
      serviceResponse.message = "You have already liked this post";
      return res.status(400).json(serviceResponse);
    }
    serviceResponse.data = like;

    res.status(201).json(serviceResponse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   DELETE /api/v1/likes/unlike/:id
// @desc    Unlike a record by id
// @access  Private
router.delete("/unlike/:id", async (req, res) => {
  try {
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

module.exports = router;
