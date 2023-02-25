/**
 * @module authController
 * @description This modules includes all methods related to authentication.
 */
const auth = require("../controllers/auth.controller");

require("../controllers/passport.controller"); // Your local passport file

/* POST login. */
/**
 * Define the login route.
 * @param {router} router
 */
module.exports = (router) => {
  router.route("/login").post(auth);
};
