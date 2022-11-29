const { Schema, model } = require("mongoose"),
  bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

const userSchema = Schema({
  username: { type: String, required: true },
  pass: { type: String, required: true },
  email: { type: String, required: true },
  birth: Date,
  favList: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.pass);
};

const User = model("User", userSchema);
module.exports = { User };
