const router = require("express").Router(),
  passport = require("passport"),
  { getActors, getActorByID } = require("../controllers/actors.controller");

// Routes for Actors
router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), getActors);

// Get the info about an actor by id
router
  .route("/:_id")
  .get(passport.authenticate("jwt", { session: false }), getActorByID);

module.exports = router;
