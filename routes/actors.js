const router = require("express").Router(),
    { getActorByID } = require("../controllers/actors");

// Get the info about an actor by id
router.route("/:_id").get(
    // passport.authenticate("jwt", { session: false }),
    getActorByID
);

module.exports = router;
