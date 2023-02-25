/**
 * @module genresController
 * @description This modules includes all methods related to genres.
 */

const { Genre: Genres } = require("../models/genres.model");

/**
 * @function
 * @description finds all the genres in the database and sets the response with data of the genres in json format.
 * @param {HttpRequest} req - request object
 * @param {HttpResponse} res - response object
 * @returns {void}
 */
const getGenres = (req, res) => {
  Genres.find()
    .then((genres) => {
      res.status(200).json(genres);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};

/**
 * @function
 * @description finds the first genre in the database that matches the given genre name and sets the response with data of the genres in json format.
 * @param {HttpRequest} req - request object
 * @param {HttpResponse} res - response object
 * @returns {void}
 */
const getGenreByName = (req, res) => {
  const { name } = req.params;
  Genres.findOne({ name: name })
    .then((genre) => {
      if (genre) {
        res.status(200).json(genre);
      } else {
        res
          .status(404)
          .json({ message: `No Genre Found with the name: ${name}` });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};

/**
 * @function
 * @description finds the first genre in the database that matches the given genre ID and sets the response with data of the genres in json format.
 * @param {HttpRequest} req - request object
 * @param {HttpResponse} res - response object
 * @returns {void}
 */
const getGenreByID = (req, res) => {
  const { _id } = req.params;
  Genres.findById(_id)
    .then((genre) => {
      if (genre) {
        res.status(200).json(genre);
      } else {
        res.status(404).json({ message: `No Genre Found with the ID: ${_id}` });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};

module.exports = { getGenres, getGenreByName, getGenreByID };
