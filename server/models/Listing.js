const mongoose = require("mongoose");

//a schema to define the structure of our listing document
const listingSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: ["available", "sold"],
        deafault: "available",
        required: true,
    },

    seller: {

        //the id of a user document to track what user owns what listing
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

}, {timestamps: true});

module.exports = mongoose.model("listing", listingSchema)