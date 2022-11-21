const { Schema, model } = require("mongoose");

const genreSchema = Schema({
    name: { type: String, required: true },
    des: String,
});

const Genre = model("Genre", genreSchema);
module.exports = { Genre };
