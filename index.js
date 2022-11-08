"use strict";

require("dotenv").config();
// Requirements
const
	express = require("express"),
	morgan = require("morgan"),
	fs = require("fs"),
	path = require("path"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	{ v4: uuidV4 } = require("uuid"),
	mongoose = require('mongoose'),
	bcrypt = require("bcryptjs");

const PORT = process.env.PORT || 3000;
const salt = bcrypt.genSaltSync(10);
const app = express();
const { Director: Directors, Actor: Actors, Genre: Genres, Movie: Movies, User: Users, User } = require('./models/models.js');

// Directors.collection.drop();
// Genres.collection.drop();
// Movies.collection.drop();
// Users.collection.drop();

mongoose.connect(
	process.env.DATABASE_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

// create a write stream (in append mode) a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), { flags: "a" });
// setup the logger

const requestDateTimeNow = (req, res, next) => {
	const dateIns = new Date();
	const dateNow =
	dateIns.getDate() + "/" +
	(dateIns.getMonth() + 1) + "/" +
	dateIns.getFullYear() + " @ " +
	dateIns.getHours() + ":" +
	dateIns.getMinutes() + ":" +
	dateIns.getSeconds();
	req.requestDateTime = dateNow;
	console.log(req.url, "...requested -", dateNow);
	next();
};

app.use(requestDateTimeNow);
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(methodOverride());

app.use(express.static(path.join(__dirname, "public")));

// Public Routes
app.route("/")
	.get((req, res) => {
		res.sendFile("/public/index.html", { root: __dirname });
	});

app.route("/documentation")
	.get((req, res) => {
		res.sendFile("/public/documentation.html", { root: __dirname });
	});

// Routes for Movies
app.route("/movies")
	.get((req, res) => {
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
	});

// Get a Movie by Title
app.route("/movies/:title")
	.get((req, res) => {
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
	});

// Get the genre of a movie by name
app.route("/movies/genres/:name")
	.get((req, res) => {
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
	});

// Get the info about a director by name
app.route("/movies/directors/:name")
	.get((req, res) => {
		const { name } = req.params;
		Directors.findOne(
			{ name: name }
		).then((genre) => {
			if (genre) {
				res.status(200)
					.json(genre);
			} else {
				res.status(404)
					.send(`No Director Found with the name: ${name}`);
			}
		}).catch((err) => {
			console.error(err);
			res.status(500)
				.send("Error: " + err);
		});
	});

// Routes for Users
app.route("/users")
	// Get all users (just for the development phase)
	.get((req, res) => {
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
	})
	// Create a new user
	.post((req, res) => {
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
						newUser.pass = bcrypt.hashSync(pass, salt);
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
	});

app.route("/users/:username")
	// Find a user		-------------------------------------------
	.get((req, res) => {
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
	})
	// Update a user	-------------------------------------------
	.put((req, res) => {
		const { username } = req.params;
		const { pass, email, birth } = req.body;
		if (username) {
			Users.findOneAndUpdate(
				{ username: username },
				{
					$set:
					{
						username: username,
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
				.send("Username is required!!!");
		}
	})
	// Delete a user	-------------------------------------------
	.delete((req, res) => {
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
	});

// Add a movie to the favorite movies -----------------------------
app.route("/users/:username/favorites/:movieID")
	.patch((req, res) => {
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
	})
	// Delete from favorite movies --------------------------------
	.delete((req, res) => {
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
	});

// Error-handling middleware
app.use((err, req, res, next) => {
	console.error("Error:\n", err.stack);
	res.status(500)
		.send("Something broke!");
});

mongoose.connection.once("open", () => {
    console.log("Connected to Database");
    // Start the server and listen to events on port ...
    app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
});
