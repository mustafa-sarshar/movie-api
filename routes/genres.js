const router = require("express").Router(),
  { getGenres, getGenreByID } = require("../controllers/genres");

// Routes for Genres
router.route("/").get(
  // passport.authenticate("jwt", { session: false }),
  getGenres
);

// Get the info about a genre by id
router.route("/:_id").get(
  // passport.authenticate("jwt", { session: false }),
  getGenreByID
);

module.exports = router;
