const
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt"),
    { User: Users } = require("../models/models");

passport.use(new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "pass"
    },
    (username, pass, done) => {
        console.log(`LocalStrategy: username: ${username}, password: ${pass}`);
        Users.findOne(
            { username: username },
            (err, user) => {
                if (err) {
                    console.log("LocalStrategy: Error:", err);
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: "LocalStrategy: Incorrect username or password." });
                }
                if (!user.verifyPassword(pass)) {
                    return done(null, false, { message: "LocalStrategy: Incorrect password." });
                }
                console.log("LocalStrategy: Finished!!!");
                return done(null, user);
            }
        );
    }
));

const JWTStrategyOpts = {}
JWTStrategyOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
JWTStrategyOpts.secretOrKey = process.env.SECRET_KEY;

passport.use(new JWTStrategy(
    JWTStrategyOpts,
    (jwtPayload, done) => {
        console.log("JWTStrategy:", jwtPayload._id);
        return Users.findById(jwtPayload._id)
            .then((user) => {
                return done(null, user);
            })
            .catch((err) => {
                return done(err);
            });
    }
));
