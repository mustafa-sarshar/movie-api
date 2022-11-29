const { check } = require("express-validator");

// Set Input Validations
const inputFieldCheckers = [
  check("username", "Username is required").isLength({ min: 5 }),
  check(
    "username",
    "Username contains non alphanumeric characters - not allowed."
  ).isAlphanumeric(),
  check("pass", "Password is required").not().isEmpty(),
  check("email", "Email does not appear to be valid").isEmail(),
];

module.exports = { inputFieldCheckers };
