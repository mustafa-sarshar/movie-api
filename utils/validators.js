const { check } = require("express-validator");

// Set Input Validations
const inputFieldCheckersForSignUp = [
  check("username", "Username is required").not().isEmpty(),
  check(
    "username",
    "Username length must be at least 5 characters."
  ).isLength({ min: 5 }),
  check(
    "username",
    "Username contains non alphanumeric characters - not allowed."
  ).isAlphanumeric(),
  check("pass", "Password is required").not().isEmpty(),
  check(
    "pass",
    "Password length must be at least 5 characters."
  ).isLength({ min: 5 }),
  check("email", "Email is required").not().isEmpty(),
  check("email", "Email does not appear to be valid").isEmail(),
  check("birth", "Birth date format is not correct").isDate().optional(),
];

// Set Input Validations
const inputFieldCheckersForUpdate = [
  check("username", "Username length must be at least 5 characters.")
    .isLength({ min: 5 })
    .optional(),
  check(
    "username",
    "Username contains non alphanumeric characters - not allowed."
  )
    .isAlphanumeric()
    .optional(),
  check("pass", "Password length must be at least 5 characters.")
    .isLength({ min: 5 })
    .optional(),
  check("email", "Email does not appear to be valid").isEmail().optional(),
  check("birth", "Birth date format is not correct").isDate().optional(),
];

module.exports = { inputFieldCheckersForSignUp, inputFieldCheckersForUpdate };
