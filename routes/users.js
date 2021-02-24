const express = require("express");
const router = express.Router();
const ServiceResponse = require("../ServiceResponse");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// @route POST api/v1/users/register
// @desc Register a user
// @access Public
router.post(
  "/register",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const serviceResponse = new ServiceResponse();
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        serviceResponse.success = false;
        serviceResponse.message = errors.array();
        res.status(400).json(serviceResponse);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      if (!user) {
        serviceResponse.success = false;
        serviceResponse.message = "User could not be created.";
        res.status(400).json(serviceResponse);
      }

      serviceResponse.data = user;

      res.status(201).json(serviceResponse);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

module.exports = router;
