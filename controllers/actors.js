const { Actor: Actors } = require("../models/actors");

const getActorByName = (req, res) => {
    const { name } = req.params;
    Actors.findOne({ name: name })
        .then((actor) => {
            if (actor) {
                res.status(200).json(actor);
            } else {
                res.status(404).send(
                    `No Director Found with the name: ${name}`,
                );
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: err.message });
        });
};

module.exports = { getActorByName };