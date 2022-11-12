"use strict";
require("dotenv").config();

// Requirements
const
	express = require("express"),
	{ check } = require("express-validator"),
	morgan = require("morgan"),
	fs = require("fs"),
	path = require("path"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	swaggerUi = require("swagger-ui-express");

const
	{ requestDateTimeNow } = require("./utils/middleware.js"),
	{ corsMiddleware } = require("./config/cors"),
	{ swaggerJsdocSpecs } = require("./controller/api_docs.js"),
	{ getMovies, getMovieByTitle, getGenreByName, getDirectorByName, getActorByName } = require("./routes/movies.js"),
	{ getUsers, createNewUser, findUser, updateUser, deleteUser, addMovieToFavList, deleteMovieFromFavList } = require("./routes/users.js");

const inputFieldCheckers = [
	check("username", "Username is required").isLength({ min: 5 }),
	check("username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
	check("pass", "Password is required").not().isEmpty(),
	check("email", "Email does not appear to be valid").isEmail(),
];

mongoose.connect(
	process.env.DATABASE_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

// create a write stream (in append mode) a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), { flags: "a" });

const PORT = process.env.PORT || 3000;
const app = express();

app.use(requestDateTimeNow);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(corsMiddleware);		// Apply Cross-Origin Resource Sharing (CORS)

const auth = require("./controller/auth")(app);
require("./controller/passport");

app.use(bodyParser.json());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(methodOverride());

app.use(express.static(path.join(__dirname, "public")));	// Public files

// Public Routes
app.route("/")
	.get(
		(req, res) => {
			res.sendFile("/public/index.html", { root: __dirname });
		}
	);

app.route("/documentation")
	.get(
		(req, res) => {
			res.sendFile("/public/documentation.html", { root: __dirname });
		}
	);

// Routes for Movies
app.route("/movies")
	.get(
		passport.authenticate("jwt", { session: false }),
		getMovies
	);

// Get a Movie by Title
app.route("/movies/:title")
	.get(
		passport.authenticate("jwt", { session: false }),
		getMovieByTitle
	);

// Get the genre of a movie by name
app.route("/movies/genres/:name")
	.get(
		passport.authenticate("jwt", { session: false }),
		getGenreByName
	);

// Get the info about a director by name
app.route("/movies/directors/:name")
	.get(
		passport.authenticate("jwt", { session: false }),
		getDirectorByName
	);

app.route("/movies/actors/:name")
	.get(
		passport.authenticate("jwt", { session: false }),
		getActorByName
	);

// Routes for Users
app.route("/users")
	// Get all users (just for the development phase)
	.get(
		passport.authenticate("jwt", { session: false }),
		getUsers
	)
	// Create a new user
	.post(
		inputFieldCheckers,
		createNewUser
	);

app.route("/users/:username")
	// Find a user		-------------------------------------------
	.get(
		passport.authenticate("jwt", { session: false }),
		findUser
	)
	// Update a user	-------------------------------------------
	.put(
		[
			passport.authenticate("jwt", { session: false }),
			...inputFieldCheckers
		],
		updateUser
	)
	// Delete a user	-------------------------------------------
	.delete(
		passport.authenticate("jwt", { session: false }),
		deleteUser
	);

// Add a movie to the favorite movies -----------------------------
app.route("/users/:username/favorites/:movieID")
	.patch(
		passport.authenticate("jwt", { session: false }),
		addMovieToFavList
	)
	// Delete from favorite movies --------------------------------
	.delete(
		passport.authenticate("jwt", { session: false }),
		deleteMovieFromFavList
	);

// Error-handling middleware
app.use(
	(err, req, res, next) => {
		console.error("Error:\n", err.stack);
		res.status(500)
			.send("Something broke!");
	}
);

app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerJsdocSpecs, { explorer: true })
);	// Swagger UI for API Documentation

mongoose.connection.once("open", () => {
	console.log("Connected to Database");
	// Start the server and listen to events on port ...
	app.listen(PORT, "0.0.0.0", () => { console.log(`Server is running on port ${PORT}`); });
});
