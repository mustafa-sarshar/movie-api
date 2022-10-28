"use strict";

// Requirements
const
	express = require("express"),
	morgan = require("morgan"),
	fs = require("fs"),
	path = require("path"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override");

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

app.use(express.static(path.join("public")));

let topMovies = [
	{
		title: "Movie 1",
		author: "Author 1",
	},
	{
		title: "Movie 2",
		author: "Author 2",
	},
	{
		title: "Movie 3",
		author: "Author 3",
	},
	{
		title: "Movie 4",
		author: "Author 4",
	},
	{
		title: "Movie 5",
		author: "Author 5",
	},
	{
		title: "Movie 6",
		author: "Author 6",
	}
]

// GET requests
app.get("/", (req, res) => {
	res.send("Welcome to my Movie club!");
});

app.get("/documentation", (req, res) => {
	res.sendFile("/public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
	res.json(topMovies);
});

// Error-handling middleware
app.use((err, req, res, next) => {
	console.error("Error:\n", err.stack);
	res.status(500).send("Something broke!");
});

// listen for requests
app.listen(port, () => {
	console.log(`Your app is listening on port ${port}.`);
});