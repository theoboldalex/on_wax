const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const ServiceResponse = require("../ServiceResponse.js");
const Follow = require("../models/Follow.js");

// @route   POST /api/v1/followers/follow/:id
// @desc    Follow a user
// @access  Private
router.post("/follow/:id", auth, async (req, res) => {
  try {
    // user id of who you want to follow
    const { id } = req.params;

    const serviceResponse = new ServiceResponse();

    if (req.user.id == id) {
      serviceResponse.success = false;
      serviceResponse.message = `User ${id} could not be followed.`;
      return res.status(400).json(serviceResponse);
    }

    const follow = await Follow.findOrCreate({
      where: {
        followerId: req.user.id,
        followingId: id,
      },
    });

    if (!follow[1]) {
      serviceResponse.success = false;
      serviceResponse.message = `You are already following user ${id}`;
      return res.status(400).json(serviceResponse);
    }

    serviceResponse.data = follow;
    serviceResponse.message = `You are now following user ${id}`;
    res.status(201).json(serviceResponse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   DELETE /api/v1/followers/unfollow/:id
// @desc    Unfollow a user
// @access  Private
router.delete("/unfollow/:id", async (req, res) => {});

module.exports = router;
