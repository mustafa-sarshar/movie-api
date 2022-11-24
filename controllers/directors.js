const { Director: Directors } = require("../models/directors");

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

const getDirectorByID = (req, res) => {
    const { _id } = req.params;
    Directors.findById(_id)
        .then((director) => {
            if (director) {
                res.status(200).json(director);
            } else {
                res.status(404).send(`No Director Found with the ID: ${_id}`);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: err.message });
        });
};

module.exports = { getDirectorByName, getDirectorByID };
