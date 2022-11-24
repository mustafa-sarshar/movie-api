const router = require("express").Router(),
    { getMovies, getMovieByTitle } = require("../controllers/movies"),
    { getGenreByName } = require("../controllers/genres"),
    {
        getDirectorByName,
        getDirectorByID,
    } = require("../controllers/directors"),
    { getActorByName } = require("../controllers/actors");

// Routes for Movies
router.route("/").get(
    // passport.authenticate("jwt", { session: false }),
    getMovies
);

// Get a Movie by Title
router.route("/:title").get(
    // passport.authenticate("jwt", { session: false }),
    getMovieByTitle
);

// Get the genre of a movie by name
router.route("/genres/:name").get(
    // passport.authenticate("jwt", { session: false }),
    getGenreByName
);

// Get the info about a director by name
router.route("/directors/:name").get(
    // passport.authenticate("jwt", { session: false }),
    getDirectorByName
);

router.route("/actors/:name").get(
    // passport.authenticate("jwt", { session: false }),
    getActorByName
);

module.exports = router;
