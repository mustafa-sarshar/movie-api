"use strict";

require("dotenv").config();
// Requirements
const
	express = require("express"),
	{ check, validationResult } = require('express-validator'),
	morgan = require("morgan"),
	fs = require("fs"),
	path = require("path"),
	{ requestDateTimeNow } = require("./utils/middleware"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	mongoose = require('mongoose'),
	cors = require("cors"),
	passport = require("passport");

const PORT = process.env.PORT || 3000;
const app = express();
const { Director: Directors, Actor: Actors, Genre: Genres, Movie: Movies, User: Users, User } = require('./models/models.js');

mongoose.connect(
	process.env.DATABASE_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

// create a write stream (in append mode) a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), { flags: "a" });

app.use(requestDateTimeNow);
app.use(bodyParser.urlencoded({
	extended: true
}));

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(";");
app.use(cors(	// Apply Cross-Origin Resource Sharing (CORS)
	{
		origin: (origin, callback) => {
			if (!origin)
				return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
				const message = "The CORS policy for this application doesn’t allow access from origin " + origin;
				return callback(new Error(message), false);
			}
			return callback(null, true);
		},
		optionsSuccessStatus: 200
	}
));

const auth = require("./controller/auth")(app);
require("./controller/passport");

app.use(bodyParser.json());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(methodOverride());

app.use(express.static(path.join(__dirname, "public")));

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
		(req, res) => {
			Movies.find()
				.then((users) => {
					res.status(200)
						.json(users);
				})
				.catch((err) => {
					console.error(err);
					res.status(500)
						.send("Error: " + err);
				});
		}
	);

// Get a Movie by Title
app.route("/movies/:title")
	.get(
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			const { title } = req.params;
			Movies.findOne(
				{ title: title }
			).then((movie) => {
				if (movie) {
					res.status(200)
						.json(movie);
				} else {
					res.status(404)
						.send(`No Movie Found with the title: ${title}`);
				}
			}).catch((err) => {
				console.error(err);
				res.status(500)
					.send("Error: " + err);
			});
		}
	);

// Get the genre of a movie by name
app.route("/movies/genres/:name")
	.get(
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			const { name } = req.params;
			Genres.findOne(
				{ name: name }
			).then((genre) => {
				if (genre) {
					res.status(200)
						.json(genre);
				} else {
					res.status(404)
						.send(`No Genre Found with the name: ${name}`);
				}
			}).catch((err) => {
				console.error(err);
				res.status(500)
					.send("Error: " + err);
			});
		}
	);

// Get the info about a director by name
app.route("/movies/directors/:name")
	.get(
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			const { name } = req.params;
			Directors.findOne(
				{ name: name }
			).then((director) => {
				if (director) {
					res.status(200)
						.json(director);
				} else {
					res.status(404)
						.send(`No Director Found with the name: ${name}`);
				}
			}).catch((err) => {
				console.error(err);
				res.status(500)
					.send("Error: " + err);
			});
		}
	);

app.route("/movies/actors/:name")
	.get(
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			const { name } = req.params;
			Actors.findOne(
				{ name: name }
			).then((actor) => {
				if (actor) {
					res.status(200)
						.json(actor);
				} else {
					res.status(404)
						.send(`No Director Found with the name: ${name}`);
				}
			}).catch((err) => {
				console.error(err);
				res.status(500)
					.send("Error: " + err);
			});
		}
	);

// Routes for Users
app.route("/users")
	// Get all users (just for the development phase)
	.get(
		// passport.authenticate("jwt", { session: false }),
		(req, res) => {
		Users.find()
			.then((users) => {
				res.status(200)
					.json(users);
			})
			.catch((err) => {
				console.error(err);
				res.status(500)
					.send("Error: " + err);
			})
	}
	)
	// Create a new user
	.post(
		[
			check("username", "Username is required").isLength({ min: 5 }),
			check("username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
			check("pass", "Password is required").not().isEmpty(),
			check("email", "Email does not appear to be valid").isEmail(),
		],
		(req, res) => {
			// check the validation object for errors
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422)
					.json({ errors: errors.array() });
			}
			const { username, pass, email, birth } = req.body;
			if (username && pass && email) {
				Users.findOne({ username: username })
					.then((user) => {
						if (user) {
							return res.status(400)
								.send(username + "already exists");
						} else {
							const newUser = {};
							newUser.username = username;
							newUser.pass = Users.hashPassword(pass);
							newUser.email = email;
							if (birth) newUser.birth = birth;
							Users
								.create(newUser)
								.then((user) => {
									res.status(201)	// CREATED
										.json(user)
								})
								.catch((error) => {
									console.error(error);
									res.status(500)
										.send("Error: " + error);
								});
						}
					})
					.catch((error) => {
						console.error(error);
						res.status(500)
							.send("Error: " + error);
					});
			} else {
				res.status(400)		// BAD REQUEST
					.send("Username, password and email are required!!!");
			}
		}
	);

app.route("/users/:username")
	// Find a user		-------------------------------------------
	.get(
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			const { username } = req.params;
			Users.findOne({ username: username })
				.then((user) => {
					res.json(user);
				})
				.catch((err) => {
					console.error(err);
					res.status(500)
						.send("Error: " + err);
				});
		}
	)
	// Update a user	-------------------------------------------
	.put(
		[
			passport.authenticate("jwt", { session: false }),
			check("username", "Username is required").isLength({ min: 5 }),
			check("username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
			check("pass", "Password is required").not().isEmpty(),
			check("email", "Email does not appear to be valid").isEmail()
		],
		async (req, res) => {
			// check the validation object for errors
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422)
					.json({ errors: errors.array() });
			}
			const { username } = req.params;
			const { username: uname, pass, email, birth } = req.body;
			const duplicationCheck = await User.find({ username: uname }).exec();
			if (duplicationCheck.length === 0) {
				Users.findOneAndUpdate(
					{ username: username },
					{
						$set:
						{
							username: uname,
							pass: pass,
							email: email,
							birth: birth
						}
					},
					{ new: true }, // This line makes sure that the updated document is returned
					(err, updatedUser) => {
						if (err) {
							res.status(500)
								.send("Error: " + err);
						} else {
							res.json(updatedUser);
						}
					});
			} else {
				res.status(400)		// BAD REQUEST
					.send("The new username is not available!!!");
			}
		}
	)
	// Delete a user	-------------------------------------------
	.delete(
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			const { username } = req.params;
			Users.findOneAndRemove(
				{ username: username },
				(err, deletedUser) => {
					if (err) {
						res.status(500)
							.send("Error: " + err);
					} else {
						res.status(200)
							.send(`The user with username: ${username} deregistered from the database.`);
					}
				});
		}
	);

// Add a movie to the favorite movies -----------------------------
app.route("/users/:username/favorites/:movieID")
	.patch(
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			const { username, movieID } = req.params;
			Users.findOneAndUpdate(
				{ username: username },
				{
					$addToSet: {
						favList: movieID
					}
				},
				{ new: true }, // To make sure that the updated document is returned
				(err, updatedUser) => {
					if (err) {
						res.status(500)
							.send("Error: " + err);
					} else {
						res.status(200)
							.send(`The movie with ID: ${movieID} added to favorite list of movies of the user: ${username}`);
					}
				});
		}
	)
	// Delete from favorite movies --------------------------------
	.delete(
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			const { username, movieID } = req.params;
			Users.findOneAndUpdate(
				{ username: username },
				{
					$pull: {
						favList: movieID
					}
				},
				{ new: true }, // To make sure that the updated document is returned
				(err, updatedUser) => {
					if (err) {
						res.status(500)
							.send("Error: " + err);
					} else {
						res.status(200)
							.send(`The movie with ID: ${movieID} removed from favorite list of movies of the user: ${username}`);
					}
				});
		}
	);

// Error-handling middleware
app.use(
	(err, req, res, next) => {
		console.error("Error:\n", err.stack);
		res.status(500)
			.send("Something broke!");
	}
);

mongoose.connection.once("open", () => {
	console.log("Connected to Database");
	// Start the server and listen to events on port ...
	app.listen(PORT, "0.0.0.0", () => { console.log(`Server is running on port ${PORT}`); });
});
