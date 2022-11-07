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

let lstMovies = [
	{
		id: uuidV4(),
		title: "Movie 1",
		author: "Author 1",
		description: "Movie 1 Description",
		genre: {
			name: "Movie 1 Genre",
			description: "Movie 1 Genre Description",
		},
		director: {
			name: "Director 1",
			bio: "Bio Director 1",
			birthYear: 1890,
			deathYear: 2002,
		},
		imageURL: "image_1.png",
		featured: false,
	},
	{
		id: uuidV4(),
		title: "Movie 2",
		author: "Author 2",
		description: "Movie 2 Description",
		genre: {
			name: "Movie 2 Genre",
			description: "Movie 2 Genre Description",
		},
		director: {
			name: "Director 2",
			bio: "Bio Director 2",
			birthYear: 1990,
			deathYear: 2012,
		},
		imageURL: "image_2.png",
		featured: false,
	},
	{
		id: uuidV4(),
		title: "Movie 3",
		author: "Author 3",
		description: "Movie 3 Description",
		genre: {
			name: "Movie 3 Genre",
			description: "Movie 3 Genre Description",
		},
		director: {
			name: "Director 3",
			bio: "Bio Director 3",
			birthYear: 2000,
			deathYear: 2022,
		},
		imageURL: "image_3.png",
		featured: false,
	},
	{
		id: uuidV4(),
		title: "Movie 4",
		author: "Author 4",
		description: "Movie 4 Description",
		genre: {
			name: "Movie 4 Genre",
			description: "Movie 4 Genre Description",
		},
		director: {
			name: "Director 4",
			bio: "Bio Director 4",
			birthYear: 1900,
			deathYear: 2000,
		},
		imageURL: "image_4.png",
		featured: false,
	},
	{
		id: uuidV4(),
		title: "Movie 5",
		author: "Author 5",
		description: "Movie 5 Description",
		genre: {
			name: "Movie 5 Genre",
			description: "Movie 5 Genre Description",
		},
		director: {
			name: "Director 5",
			bio: "Bio Director 5",
			birthYear: 2001,
			deathYear: 2021,
		},
		imageURL: "image_5.png",
		featured: false,
	},
];

let lstUsers = [
	{
		id: uuidV4(),
		name: "user 1",
		favoriteMovies: [],
	},
	{
		id: uuidV4(),
		name: "user 2",
		favoriteMovies: ["Movie 1"],
	},
	{
		id: uuidV4(),
		name: "user 3",
		favoriteMovies: ["Movie 2", "Movie 5"],
	},
];

// Public Routes
app.get("/", (req, res) => {
	res.sendFile("/public/index.html", { root: __dirname });
});

app.get("/documentation", (req, res) => {
	res.sendFile("/public/documentation.html", { root: __dirname });
});

// Routes for Movies
app.get("/movies", (req, res) => {
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
app.get("/movies/:title", (req, res) => {
	const { title } = req.params;
	const movie = lstMovies.find((movie) => movie.title === title);
	if (movie)
		res.status(200)
			.json(movie);
	else
		res.status(404)
			.send(`No Movie Found with the title: ${title}`);
});

// Get the genre of a movie by title
app.get("/movies/genre/:name", (req, res) => {
	const { name } = req.params;
	const genre = lstMovies.find((movie) => movie.genre.name === name).genre;
	if (genre)
		res.status(200)
			.json(genre);
	else
		res.status(404)
			.send(`No Genre Found with the name: ${name}`);
});

// Get the info about a director by name
app.get("/movies/directors/:name", (req, res) => {
	const { name } = req.params;
	const director = lstMovies.find((movie) => movie.director.name === name).director;
	if (director)
		res.status(200)
			.json(director);
	else
		res.status(404)
			.send(`No Director Found with the name: ${name}`);
});

// Routes for Users

// Get all users (just for the development phase)
app.get("/users", (req, res) => {
	Users.find()
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

// Create a new user
app.route("/users")
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
					res.json(deletedUser);
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
			{ new: true }, // This line makes sure that the updated document is returned
			(err, updatedUser) => {
				if (err) {
					res.status(500)
						.send("Error: " + err);
				} else {
					res.json(updatedUser);
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
			{ new: true }, // This line makes sure that the updated document is returned
			(err, updatedUser) => {
				if (err) {
					res.status(500)
						.send("Error: " + err);
				} else {
					res.json(updatedUser);
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
