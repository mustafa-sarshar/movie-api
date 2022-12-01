const { Movie: Movies } = require("../models/movies");

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

const getMoviesPopulated = (req, res) => {
  Movies.find()
    .populate({
      path: "directors genres stars",
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
