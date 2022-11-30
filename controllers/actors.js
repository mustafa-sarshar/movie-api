const { Actor: Actors } = require("../models/actors");

const getActors = (req, res) => {
  Actors.find()
    .then((actors) => {
      res.status(200).json(actors);
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

const getActorByID = (req, res) => {
  const { _id } = req.params;
  Actors.findById(_id)
    .then((actor) => {
      if (actor) {
        res.status(200).json(actor);
      } else {
        res.status(404).json({ message: `No Actor Found with the ID: ${_id}` });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};

module.exports = { getActors, getActorByName, getActorByID };
