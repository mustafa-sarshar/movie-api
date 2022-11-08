const
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt"),
    { User: Users } = require("../models/models");

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'pass'
    },
    (username, password, done) => {
        console.log(`LocalStrategy: username: ${username}, password: ${password}`);
        Users.findOne(
            { username: username },
            (err, user) => {
                if (err) {
                    console.log("LocalStrategy: Error:", err);
                    return done(err);
                }
                if (!user) {
                    console.log("LocalStrategy: Username not correct!!!");
                    return done(null, false, { message: "LocalStrategy: Incorrect username or password." });
                }
                if (!user.verifyPassword(password)) {
                    console.log("LocalStrategy: Password not verified!!!")
                    return done(null, false);
                }
                console.log("LocalStrategy: Finished!!!");
                return done(null, user);
            }
        );
    }
));

const JWTStrategyOpts = {}
JWTStrategyOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
JWTStrategyOpts.secretOrKey = "your_jwt_secret";

passport.use(new JWTStrategy(
    JWTStrategyOpts,
    (jwtPayload, done) => {
        return Users.findById(jwtPayload._id)
            .then((user) => {
                return done(null, user);
            })
            .catch((err) => {
                return done(err);
            });
    }
));
