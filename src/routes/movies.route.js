const router = require("express").Router(),
  passport = require("passport"),
  {
    getMovies,
    getMoviesPopulated,
    getMovieByTitle,
  } = require("../controllers/movies.controller"),
  { getGenreByName } = require("../controllers/genres.controller"),
  { getDirectorByName } = require("../controllers/directors.controller"),
  { getActorByName } = require("../controllers/actors.controller");

// Routes for Movies
router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), getMovies);

// Routes for Movies (Populated)
router
  .route("/populated")
  .get(passport.authenticate("jwt", { session: false }), getMoviesPopulated);

// Get a Movie by Title
router
  .route("/:title")
  .get(passport.authenticate("jwt", { session: false }), getMovieByTitle);

// Get the genre of a movie by name
router
  .route("/genres/:name")
  .get(passport.authenticate("jwt", { session: false }), getGenreByName);

// Get the info about a director by name
router
  .route("/directors/:name")
  .get(passport.authenticate("jwt", { session: false }), getDirectorByName);

router
  .route("/actors/:name")
  .get(passport.authenticate("jwt", { session: false }), getActorByName);

module.exports = router;
