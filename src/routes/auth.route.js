const router = require("express").Router(),
  auth = require("../controllers/auth.controller");

require("../controllers/passport.controller"); // Your local passport file

/**
 * Routes for Authentication
 */

/**
 * Route for login
 */
router.route("/").post(auth);

module.exports = router;
