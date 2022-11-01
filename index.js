"use strict";

// Requirements
const
	express = require("express"),
	morgan = require("morgan"),
	fs = require("fs"),
	path = require("path"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	uuid = require("uuid");

const port = process.env.PORT || 8080;

const app = express();

// create a write stream (in append mode) a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), { flags: "a" });
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

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
app.use(methodOverride());

app.use(express.static("public"));

let lstMovies = [
	{
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
		id: "1",
		name: "user 1",
		favoriteMovies: [],
	},
	{
		id: "2",
		name: "user 2",
		favoriteMovies: ["Movie 1"],
	},
	{
		id: "3",
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
	res.status(200).json(lstMovies);
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
	res.json(lstUsers);
});

// Create a new user
app.post("/users", (req, res) => {
	const newUser = req.body;
	if (newUser.name) {
		newUser.id = uuid.v4();
		lstUsers.push(newUser);
		res.status(201)		// CREATED
			.json(newUser);
	} else {
		res.status(400)		// BAD REQUEST
			.send("Name attribute is missing!!!");
	}
});

// Update a user
app.put("/users/:id", (req, res) => {
	const { id } = req.params;
	const updateUser = req.body;
	const user = lstUsers.find((user) => user.id == id);
	if (user) {
		user.name = updateUser.name;
		res.status(200)
			.json(user);
	} else
		res.status(404)		// NOT FOUND
			.send(`No User Found with the name: ${updateUser.name}`);

});

// Delete a user
app.delete("/users/:id", (req, res) => {
	const { id } = req.params;
	const user = lstUsers.find((user) => user.id == id);
	if (user) {
		lstUsers = lstUsers.filter((user) => user.id != id);
		res.status(200)
			.json(`The user with user id: ${id}, is removed.`);
	} else
		res.status(404)		// NOT FOUND
			.send(`No User Found with the name: ${updateUser.name}`);

});

// Add a movie to the favorite movies
app.post("/users/:userId/:movieTitle", (req, res) => {
	const { userId, movieTitle } = req.params;
	const user = lstUsers.find((user) => user.id == userId);
	if (user) {
		user.favoriteMovies.push(movieTitle);
		res.status(200)
			.send(`${movieTitle} has been added to ${user.name}'s favorite movies.`);
	} else
		res.status(404)		// NOT FOUND
			.send(`No User Found with the name: ${updateUser.name}`);
});

// Delete from favorite movies
app.delete("/users/:userId/:movieTitle", (req, res) => {
	const { userId, movieTitle } = req.params;
	const user = lstUsers.find((user) => user.id == userId);
	if (user) {
		user.favoriteMovies = user.favoriteMovies.filter((title) => title !== movieTitle);
		res.status(200)
			.send(`${movieTitle} has been removed from ${user.name}'s favorite movies.`);
	} else
		res.status(404)		// NOT FOUND
			.send(`No User Found with the name: ${updateUser.name}`);

});

// Error-handling middleware
app.use((err, req, res, next) => {
	console.error("Error:\n", err.stack);
	res.status(500)
		.send("Something broke!");
});

// listen for requests
app.listen(port, () => {
	console.log(`Your app is listening on port ${port}.`);
});