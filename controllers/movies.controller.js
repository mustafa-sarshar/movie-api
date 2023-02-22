/**
 * @module moviesController
 * @description This modules includes all methods related to movies.
 */
const { Movie: Movies } = require("../models/movies.model");

/**
 * @function
 * @description finds all the movies in the database and sets the response with data of the movies in json format.
 * @param {HttpRequest} req - request object
 * @param {HttpResponse} res - response object
 * @returns {void}
 */
const getMovies = (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};

/**
 * @function
 * @description finds all the movies in the database and sets the response with populated data of the movies in json format.
 * @param {HttpRequest} req - request object
 * @param {HttpResponse} res - response object
 * @returns {void}
 */
const getMoviesPopulated = (req, res) => {
  Movies.find()
    .populate({
      path: "directors movies stars",
      select: "",
    })
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};

/**
 * @function
 * @description finds the first movie in the database that matches the given movie title and sets the response with data of the movies in json format.
 * @param {HttpRequest} req - request object
 * @param {HttpResponse} res - response object
 * @returns {void}
 */
const getMovieByTitle = (req, res) => {
  const { title } = req.params;
  Movies.findOne({ title: title })
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        res
          .status(404)
          .json({ message: `No Movie Found with the title: ${title}` });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};

module.exports = { getMovies, getMoviesPopulated, getMovieByTitle };
