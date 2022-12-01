const { Schema, model } = require("mongoose");

const movieSchema = Schema({
  title: { type: String, required: true },
  des: { type: String, required: true },
  directors: [{ type: Schema.Types.ObjectId, ref: "Director" }],
  genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  stars: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
  image_url: String,
  featured: Boolean,
});

const Movie = model("Movie", movieSchema);
module.exports = { Movie };
