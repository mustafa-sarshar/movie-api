const router = require("express").Router(),
    { getGenreByID } = require("../controllers/genres");

// Get the info about a genre by id
router.route("/:_id").get(
    // passport.authenticate("jwt", { session: false }),
    getGenreByID
);

module.exports = router;
