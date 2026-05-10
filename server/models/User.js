const mongoose = require("mongoose");

//a schema to define the structure of our user document
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("User", userSchema);