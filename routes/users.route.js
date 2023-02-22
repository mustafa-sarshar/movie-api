const router = require("express").Router(),
  passport = require("passport"),
  {
    inputFieldCheckersForSignUp,
    inputFieldCheckersForUpdate,
  } = require("../utilities/validators.utility"),
  {
    getUsers,
    createNewUser,
    findUser,
    updateUser,
    deleteUser,
    addMovieToFavList,
    deleteMovieFromFavList,
  } = require("../controllers/users.controller");

router
  .route("/")
  // Get all users (just for the development phase)
  .get(passport.authenticate("jwt", { session: false }), getUsers)
  // Create a new user
  .post(inputFieldCheckersForSignUp, createNewUser);

router
  .route("/:username")
  // Find a user		-------------------------------------------
  .get(passport.authenticate("jwt", { session: false }), findUser)
  // Update a user	-------------------------------------------
  .put(
    [
      passport.authenticate("jwt", { session: false }),
      ...inputFieldCheckersForUpdate,
    ],
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
