const { Genre: Genres } = require("../models/genres");

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

module.exports = { getGenreByName };
