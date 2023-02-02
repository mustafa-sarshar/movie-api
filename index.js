"use strict";
require("dotenv").config();

// Requirements
const express = require("express"),
  https = require("https"),
  morgan = require("morgan"),
  fs = require("fs"),
  path = require("path"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  mongoose = require("mongoose"),
  swaggerUi = require("swagger-ui-express");

const { requestDateTimeNow } = require("./utils/middleware"),
  { corsMiddleware } = require("./config/cors"),
  swaggerJSON = require("./public/swagger");

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create a write stream (in append mode) a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "log.txt"),
  {
    flags: "a",
  }
);

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
app.use("/directors", require(path.join(__dirname, "routes", "directors.js")));
app.use("/actors", require(path.join(__dirname, "routes", "actors.js")));
app.use("/genres", require(path.join(__dirname, "routes", "genres.js")));

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
  swaggerUi.setup(swaggerJSON, { explorer: true })
);

// Set and run the server
const PORT = process.env.PORT || 3000;
// Source: https://stackoverflow.com/questions/11744975/enabling-https-on-express-js
const serverCredentials = {
  key: fs.readFileSync(path.join(__dirname, "selfsigned.key"), "utf-8"),
  cert: fs.readFileSync(path.join(__dirname, "selfsigned.crt"), "utf-8"),
};

mongoose.connection.once("open", () => {
  console.log("Connected to Database");
  const server = https.createServer(serverCredentials, app);
  // Start the server and listen to events on port ...
  server.listen(PORT, "0.0.0.0", () => {
    // app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
