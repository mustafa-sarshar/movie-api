/**
 * MongoDB model for actors
 * @type {MongoDBModel}
 */

const { Schema, model } = require("mongoose");

const actorSchema = Schema({
  name: { type: String, required: true },
  bio: String,
  birth: Date,
  death: Date,
});

const Actor = model("Actor", actorSchema);
module.exports = { Actor };
