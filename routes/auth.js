const express = require("express");
const router = express.Router();

// @route   POST /api/v1/auth
// @desc    auth user and get token
// @access  public
router.post("/", (req, res) => {
  res.send("auth user and get token");
});

// @route   GET /api/v1/auth
// @desc    get currently logged in user
// @access  private
router.get("/", (req, res) => {
  res.send("get logged in user");
});

module.exports = router;
