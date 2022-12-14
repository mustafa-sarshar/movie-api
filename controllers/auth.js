const jwt = require("jsonwebtoken"),
  passport = require("passport");

const jwtSecret = process.env.SECRET_KEY; // This has to be the same key used in the JWTStrategy

require("./passport"); // Your local passport file

const generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.username, // This is the username you’re encoding in the JWT
    expiresIn: "30m", // This specifies that the token will expire in 7 days
    algorithm: "HS256", // This is the algorithm used to “sign” or encode the values of the JWT
  });
};

/* POST login. */
module.exports = (router) => {
  router.route("/login").post(async (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user,
        });
      }
      req.login(user, { session: false }, async (error) => {
        if (error) {
          res.json({ message: error });
        }
        const token = generateJWTToken(user.toJSON());
        return res.json({ user: user, token: token });

        /* const resJSON = {};
        resJSON._id = user._id.toString();
        const token = await generateJWTToken(resJSON);
        return res.json({ token: token }); 
        */
      });
    })(req, res);
  });
};
