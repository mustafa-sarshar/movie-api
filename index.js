"use strict";
require("dotenv").config();

// Requirements
const express = require("express"),
    morgan = require("morgan"),
    fs = require("fs"),
    path = require("path"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    swaggerUi = require("swagger-ui-express");

const { requestDateTimeNow } = require("./utils/middleware"),
    { corsMiddleware } = require("./config/cors"),
    swaggerJSON = require("./public/swagger");

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// create a write stream (in append mode) a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
    flags: "a",
});

const app = express();

app.use(requestDateTimeNow);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(corsMiddleware); // Apply Cross-Origin Resource Sharing (CORS)

const auth = require("./controllers/auth")(app);
require("./controllers/passport");

app.use(bodyParser.json());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(methodOverride());

// Set Routes
app.use(express.static(path.join(__dirname, "public"))); // Public files
app.use("/movies", require(path.join(__dirname, "routes", "movies.js")));
app.use("/users", require(path.join(__dirname, "routes", "users.js")));

// Public Routes
app.route("/").get((req, res) => {
    res.sendFile("/public/index.html", { root: __dirname });
});
app.route("/documentation").get((req, res) => {
    res.sendFile("/public/documentation.html", { root: __dirname });
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error("Error:\n", err.stack);
    res.status(500).send("Something broke!");
});

// Swagger UI for API Documentation
app.use(
    "/swagger",
    swaggerUi.serve,
    // swaggerUi.setup(swaggerJsdocSpecs, { explorer: true })
    swaggerUi.setup(swaggerJSON, { explorer: true }),
);

const PORT = process.env.PORT || 3000;
mongoose.connection.once("open", () => {
    console.log("Connected to Database");
    // Start the server and listen to events on port ...
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
