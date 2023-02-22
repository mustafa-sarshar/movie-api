/**
 * @module passportController
 * @description This modules includes all methods related to passport.
 */

const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt"),
  { User: Users } = require("../models/users.model");

/**
 * Sets the LocalStrategy for passport authentication.
 * @param {passport.Authenticator} strategy - LocalStrategy
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "pass",
    },
    (username, pass, done) => {
      console.log(`LocalStrategy: username: ${username}, password: ${pass}`);
      Users.findOne({ username: username }, (err, user) => {
        if (err) {
          console.log("LocalStrategy: Error:", err);
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "LocalStrategy: Incorrect username or password.",
          });
        }
        if (!user.verifyPassword(pass)) {
          return done(null, false, {
            message: "LocalStrategy: Incorrect password.",
          });
        }
        console.log("LocalStrategy: Finished!!!");
        return done(null, user);
      });
    }
  )
);

/**
 * @constant
 * @description This constant holds the JWT strategy options.
 */
const JWTStrategyOpts = {};
JWTStrategyOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
JWTStrategyOpts.secretOrKey = process.env.SECRET_KEY;

/**
 * Sets the JWTStrategy for passport authentication.
 * @param {passport.Authenticator} strategy - LocalStrategy
 */
passport.use(
  new JWTStrategy(JWTStrategyOpts, (jwtPayload, done) => {
    console.log("JWTStrategy:", jwtPayload._id);
    return Users.findById(jwtPayload._id)
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);
