const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const ServiceResponse = require("../ServiceResponse.js");
const User = require("../models/User.js");

// @route   POST /api/v1/auth
// @desc    auth user and get token
// @access  public
router.post(
  "/",
  [
    body("email", "Must be a valid email address.").isEmail(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const serviceResponse = new ServiceResponse();

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        serviceResponse.success = false;
        serviceResponse.message = "Invalid credentials.";
        res.status(400).json(serviceResponse);
      }

      // compare passwords
      const passwordIsMatch = await bcrypt.compare(password, user.password);

      if (!passwordIsMatch) {
        serviceResponse.success = false;
        serviceResponse.message = "Invalid credentials.";
        res.status(400).json(serviceResponse);
      }

      // sign and return jwt
      const payload = {};

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server error.");
    }
  }
);

// @route   GET /api/v1/auth
// @desc    get currently logged in user
// @access  private
router.get("/", (req, res) => {
  res.send("get logged in user");
});

module.exports = router;
