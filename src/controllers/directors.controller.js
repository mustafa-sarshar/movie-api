/**
 * @module directorsController
 * @description This modules includes all methods related to directors.
 */

const { Director: Directors } = require("../models/directors.model");

/**
 * @function
 * @description finds all the directors in the database and sets the response with data of the directors in json format.
 * @param {HttpRequest} req - request object
 * @param {HttpResponse} res - response object
 * @returns {void}
 */
const getDirectors = (req, res) => {
  Directors.find()
    .then((directors) => {
      res.status(200).json(directors);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};

/**
 * @function
 * @description finds the first director in the database that matches the given director name and sets the response with data of the directors in json format.
 * @param {HttpRequest} req - request object
 * @param {HttpResponse} res - response object
 * @returns {void}
 */
const getDirectorByName = (req, res) => {
  const { name } = req.params;
  Directors.findOne({ name: name })
    .then((director) => {
      if (director) {
        res.status(200).json(director);
      } else {
        res
          .status(404)
          .json({ message: `No Director Found with the name: ${name}` });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};

/**
 * @function
 * @description finds the first director in the database that matches the given director ID and sets the response with data of the directors in json format.
 * @param {HttpRequest} req - request object
 * @param {HttpResponse} res - response object
 * @returns {void}
 */
const getDirectorByID = (req, res) => {
  const { _id } = req.params;
  Directors.findById(_id)
    .then((director) => {
      if (director) {
        res.status(200).json(director);
      } else {
        res
          .status(404)
          .json({ message: `No Director Found with the ID: ${_id}` });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};

module.exports = { getDirectors, getDirectorByName, getDirectorByID };
