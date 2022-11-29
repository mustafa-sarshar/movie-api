const router = require("express").Router(),
  passport = require("passport"),
  { inputFieldCheckers } = require("../utils/validators"),
  {
    getUsers,
    createNewUser,
    findUser,
    updateUser,
    deleteUser,
    addMovieToFavList,
    deleteMovieFromFavList,
  } = require("../controllers/users");

// Routes for Users
router
  .route("/")
  // Get all users (just for the development phase)
  .get(passport.authenticate("jwt", { session: false }), getUsers)
  // Create a new user
  .post(inputFieldCheckers, createNewUser);

router
  .route("/:username")
  // Find a user		-------------------------------------------
  .get(passport.authenticate("jwt", { session: false }), findUser)
  // Update a user	-------------------------------------------
  .put(
    [passport.authenticate("jwt", { session: false }), ...inputFieldCheckers],
    updateUser
  )
  // Delete a user	-------------------------------------------
  .delete(passport.authenticate("jwt", { session: false }), deleteUser);

// Add a movie to the favorite movies -----------------------------
router
  .route("/:username/favorites/:movieID")
  .patch(passport.authenticate("jwt", { session: false }), addMovieToFavList)
  // Delete from favorite movies --------------------------------
  .delete(
    passport.authenticate("jwt", { session: false }),
    deleteMovieFromFavList
  );

module.exports = router;
