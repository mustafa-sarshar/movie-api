const router = require("express").Router(),
  passport = require("passport"),
  {
    getDirectors,
    getDirectorByID,
  } = require("../controllers/directors.controller");

// Routes for Directors
router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), getDirectors);

// Get the info about a director by id
router
  .route("/:_id")
  .get(passport.authenticate("jwt", { session: false }), getDirectorByID);

module.exports = router;
