const { Schema, model } = require("mongoose");

const movieSchema = Schema({
  title: { type: String, required: true },
  des: { type: String, required: true },
  director_id: { type: Schema.Types.ObjectId, ref: "Director" },
  genre_id: { type: Schema.Types.ObjectId, ref: "Genre" },
  stars: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
  image_url: String,
  featured: Boolean,
});

const Movie = model("Movie", movieSchema);
module.exports = { Movie };
