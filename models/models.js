const mongoose = require("mongoose");

const directorSchema = mongoose.Schema({
    name: { type: String, required: true },
    bio: String,
    birth: Date,
    death: Date
});

const genreSchema = mongoose.Schema({
    name: { type: String, required: true },
    des: String
});

const actorSchema = mongoose.Schema({
    name: { type: String, required: true },
    bio: String,
    birth: Date,
    death: Date
});

const movieSchema = mongoose.Schema({
    title: { type: String, required: true },
    des: { type: String, required: true },
    director_id: { type: mongoose.Schema.Types.ObjectId, ref: "Director" },
    genre_id: { type: mongoose.Schema.Types.ObjectId, ref: "Genre" },
    actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }],
    image_url: String,
    featured: Boolean
});

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    pass: { type: String, required: true },
    email: { type: String, required: true },
    birth: Date,
    favList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
});

const Director = mongoose.model("Director", directorSchema);
const Actor = mongoose.model("Actor", actorSchema);
const Genre = mongoose.model("Genre", genreSchema);
const Movie = mongoose.model("Movie", movieSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Director, Actor, Genre, Movie, User };