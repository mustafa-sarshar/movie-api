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
  swaggerUi = require("swagger-ui-express"),
  { requestDateTimeNow } = require("./utilities/middleware.utility"),
  { corsMiddleware } = require("./config/cors"),
  swaggerJSON = require("../public/swagger");

// const https = require("https"),
//   http = require("http");

/**
 * Define the global app variable
 */
const app = express();

/**
 * Connect the mongoose object to the database
 */
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/**
 * create a write stream (in append mode) a ‘log.txt’ file is created in root directory
 */
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "log.txt"),
  {
    flags: "a",
  }
);

/**
 * Define global middleware fo the app
 */
app.use(requestDateTimeNow);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(corsMiddleware); // Apply Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(methodOverride());

/**
 * Set the routes
 */
app.use(express.static(path.join(__dirname, "public")));
app.use("/movies", require(path.join(__dirname, "routes", "movies.route.js")));
app.use("/users", require(path.join(__dirname, "routes", "users.route.js")));
app.use(
  "/directors",
  require(path.join(__dirname, "routes", "directors.route.js"))
);
app.use("/actors", require(path.join(__dirname, "routes", "actors.route.js")));
app.use("/genres", require(path.join(__dirname, "routes", "genres.route.js")));
app.use("/login", require(path.join(__dirname, "routes", "auth.route.js")));

/**
 * Set public routes
 */
app.route("/").get((req, res) => {
  res.sendFile(path.resolve("./public/index.html"));
});
app.route("/documentation").get((req, res) => {
  res.sendFile(path.resolve("./public/tutorials/documentation.html"));
});
app.route("/tutorials").get((req, res) => {
  res.sendFile(path.resolve("./public/docs/index.html"));
});

/**
 * Error-handling middleware
 */
app.use((err, req, res, next) => {
  console.error("Error:\n", err.stack);
  res.status(500).send("Something broke!");
});

/**
 * Swagger UI for API Documentation
 */
app.use(
  "/swagger",
  swaggerUi.serve,
  // swaggerUi.setup(swaggerJsdocSpecs, { explorer: true })
  swaggerUi.setup(swaggerJSON, { explorer: true })
);

/**
 * Set and run the server
 */
const PORT_DEFAULT = 8080;
// const PORT_HTTP = process.env.PORT_HTTP || 80;
// const PORT_HTTPS = process.env.PORT_HTTPS || 443;

// // Source: https://stackoverflow.com/questions/11744975/enabling-https-on-express-js
// const serverCredentials = {
//   key: fs.readFileSync(path.join(__dirname, "selfsigned.key"), "utf-8"),
//   cert: fs.readFileSync(path.join(__dirname, "selfsigned.crt"), "utf-8"),
// };

/**
 * Listen to mongoose object as well as to the app while running.
 */
mongoose.connection.once("open", () => {
  console.log("Connected to Database");
  // const serverHttp = http.createServer(app);
  // const serverHttps = https.createServer(serverCredentials, app);
  // Start the server and listen to events on port ...
  // serverHttp.listen(PORT_HTTP, "0.0.0.0", () => {
  //   console.log(`Server (HTTP) is running on port ${PORT_HTTP}`);
  // });
  // serverHttps.listen(PORT_HTTPS, "0.0.0.0", () => {
  //   console.log(`Server (HTTPS) is running on port ${PORT_HTTPS}`);
  // });

  app.listen(PORT_DEFAULT, () => {
    console.log(`Server is running on port ${PORT_DEFAULT}`);
  });
});
