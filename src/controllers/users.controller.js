/**
 * @module usersController
 * @description This modules includes all methods related to users.
 */

const { validationResult } = require("express-validator"),
  { User: Users } = require("../models/users.model");

/**
 * @function
 * @description finds all the users in the database and sets the response with data of the users in json format.
 * @param {HttpRequest} req - request object
 * @param {HttpResponse} res - response object
 * @returns {void}
 */
const getUsers = (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error: " + err });
    });
};

/**
 * @function
 * @description creates a new user using the given user data.
 * @param {HttpRequest} req - request object
 * @param {HttpResponse} res - response object
 * @returns {void}
 */
const createNewUser = (req, res) => {
  // check the validation object for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { username, pass, email, birth } = req.body;
  if (username && pass && email) {
    Users.findOne({ username: username })
      .then((user) => {
        if (user) {
          return res
            .status(400)
            .json({ message: username + " already exists" });
        } else {
          const newUser = {};
          newUser.username = username;
          newUser.pass = Users.hashPassword(pass);
          newUser.email = email;
          if (birth) newUser.birth = birth;
          Users.create(newUser)
            .then((user) => {
              res
                .status(201) // CREATED
                .json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).json({ message: "Error: " + error });
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Error: " + error });
      });
  } else {
    res
      .status(400) // BAD REQUEST
      .send("Username, password and email are required!!!");
  }
};

/**
 * @function
 * @description finds the user with the given username.
 * @param {HttpRequest} req - request object
 * @param {HttpResponse} res - response object
 * @returns {void}
 */
const findUser = (req, res) => {
  const { username } = req.params;
  Users.findOne({ username: username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error: " + err });
    });
};

/**
 * @function
 * @description updates the user with the given username.
 * @param {HttpRequest} req - request object
 * @param {HttpResponse} res - response object
 * @returns {void}
 */
const updateUser = async (req, res) => {
  // check the validation object for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  const { username } = req.params;
  const { username: uname, email, birth } = req.body;
  let { pass } = req.body;
  const duplicationCheck = await Users.find({ username: uname }).exec();
  console.log("duplicationCheck", duplicationCheck);

  if (
    duplicationCheck.length === 0 ||
    (duplicationCheck.length > 0 && duplicationCheck[0]?.username === username)
  ) {
    if (pass) pass = await Users.hashPassword(pass);

    Users.findOneAndUpdate(
      { username: username },
      {
        $set: {
          username: uname,
          pass: pass,
          email: email,
          birth: birth,
        },
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          res.status(500).json({ message: "Error: " + err });
        } else {
          res.json(updatedUser);
        }
      }
    );
  } else {
    res.status(400).json({ message: "The new username is not available!!!" });
  }
};

/**
 * @function
 * @description deletes the user with the given username.
 * @param {HttpRequest} req - request object
 * @param {HttpResponse} res - response object
 * @returns {void}
 */
const deleteUser = (req, res) => {
  const { username } = req.params;
  Users.findOneAndRemove({ username: username }, (err, deletedUser) => {
    if (err) {
      res.status(500).json({ message: "Error: " + err });
    } else {
      res.status(200).json({
        message: `The user with username: ${username} deregistered from the database.`,
      });
    }
  });
};

/**
 * @function
 * @description adds a movie to the user's favorites with the movie ID
 * @param {HttpRequest} req - request object
 * @param {HttpResponse} res - response object
 * @returns {void}
 */
const addMovieToFavList = (req, res) => {
  const { username, movieID } = req.params;
  Users.findOneAndUpdate(
    { username: username },
    {
      $addToSet: {
        favList: movieID,
      },
    },
    { new: true }, // To make sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        res.status(500).json({ message: "Error: " + err });
      } else {
        res.status(200).json({
          message: `The movie with ID: ${movieID} added to favorite list of movies of the user: ${username}`,
        });
      }
    }
  );
};

/**
 * @function
 * @description deletes a movie from the user's favorites with the movie ID
 * @param {HttpRequest} req - request object
 * @param {HttpResponse} res - response object
 * @returns {void}
 */
const deleteMovieFromFavList = (req, res) => {
  const { username, movieID } = req.params;
  Users.findOneAndUpdate(
    { username: username },
    {
      $pull: {
        favList: movieID,
      },
    },
    { new: true }, // To make sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        res.status(500).json({ message: "Error: " + err });
      } else {
        res.status(200).json({
          message: `The movie with ID: ${movieID} removed from favorite list of movies of the user: ${username}`,
        });
      }
    }
  );
};

module.exports = {
  getUsers,
  createNewUser,
  findUser,
  updateUser,
  deleteUser,
  addMovieToFavList,
  deleteMovieFromFavList,
};
