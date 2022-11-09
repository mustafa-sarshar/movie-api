const
    mongoose = require("mongoose"),
    bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

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
    stars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }],
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

userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.pass);
};

const Director = mongoose.model("Director", directorSchema);
const Actor = mongoose.model("Actor", actorSchema);
const Genre = mongoose.model("Genre", genreSchema);
const Movie = mongoose.model("Movie", movieSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Director, Actor, Genre, Movie, User };