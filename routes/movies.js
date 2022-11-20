const {
    Director: Directors,
    Actor: Actors,
    Genre: Genres,
    Movie: Movies,
} = require("../models/models");

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

const getMovieByTitle = (req, res) => {
    const { title } = req.params;
    Movies.findOne({ title: title })
        .then((movie) => {
            if (movie) {
                res.status(200).json(movie);
            } else {
                res.status(404).send(`No Movie Found with the title: ${title}`);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: err.message });
        });
};

const getGenreByName = (req, res) => {
    const { name } = req.params;
    Genres.findOne({ name: name })
        .then((genre) => {
            if (genre) {
                res.status(200).json(genre);
            } else {
                res.status(404).send(`No Genre Found with the name: ${name}`);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: err.message });
        });
};

const getDirectorByName = (req, res) => {
    const { name } = req.params;
    Directors.findOne({ name: name })
        .then((director) => {
            if (director) {
                res.status(200).json(director);
            } else {
                res.status(404).send(
                    `No Director Found with the name: ${name}`
                );
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: err.message });
        });
};

const getActorByName = (req, res) => {
    const { name } = req.params;
    Actors.findOne({ name: name })
        .then((actor) => {
            if (actor) {
                res.status(200).json(actor);
            } else {
                res.status(404).send(
                    `No Director Found with the name: ${name}`
                );
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: err.message });
        });
};

module.exports = {
    getMovies,
    getMovieByTitle,
    getGenreByName,
    getDirectorByName,
    getActorByName,
};
