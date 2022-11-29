const router = require("express").Router(),
  { getDirectors, getDirectorByID } = require("../controllers/directors");

// Routes for Directors
router.route("/").get(
  // passport.authenticate("jwt", { session: false }),
  getDirectors
);

// Get the info about a director by id
router.route("/:_id").get(
  // passport.authenticate("jwt", { session: false }),
  getDirectorByID
);

module.exports = router;
