const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

// @route   POST /api/v1/auth
// @desc    auth user and get token
// @access  public
router.post(
  "/",
  [
    body("email", "Must be a valid email address.").isEmail(),
    body("password", "Password is required").exists(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    res.send("auth user and get token");

    // return errors for invalid req

    // find user in db

    // sign and return jwt
  }
);

// @route   GET /api/v1/auth
// @desc    get currently logged in user
// @access  private
router.get("/", (req, res) => {
  res.send("get logged in user");
});

module.exports = router;
