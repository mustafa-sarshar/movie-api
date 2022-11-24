const router = require("express").Router(),
    { getDirectorByID } = require("../controllers/directors");

// Get the info about a director by id
router.route("/:_id").get(
    // passport.authenticate("jwt", { session: false }),
    getDirectorByID
);

module.exports = router;
