const { Schema, model } = require("mongoose");

const directorSchema = Schema({
    name: { type: String, required: true },
    bio: String,
    birth: Date,
    death: Date,
});

const Director = model("Director", directorSchema);
module.exports = { Director };
