const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Listing = require('../models/listing');
const tokenAuth = require("../middleware/tokenAuth");

//performs all the CRUD operations on the listings

//GET /listings/
//retreive all listings ()
router.get("/", async function (req, res) {

    try {

        const allListings = (await Listing.find()).sort(-1);

        res.status(200).json(allListings);

    } catch (error) {

        console.log(error.mesaage);
        res.status(400).json({error: error.message});
    }

});

//GET /listings/:id
//retrieves a single listing based on a specified id
router.get("/:id", async function (req, res) {

    //".populate()" attaches the name and email of the user who created the listing
    const listing = await Listing.findById(req.params.id).populate("seller", "name email");

    try {

        //checks to see if listing exists
        if (!listing) {

            return res.status(404).json({message: "Listing Not Found"})
        }

        res.status(200).json(listing);
    } catch (error) {

        console.error(error.message);
        res.status(400).json({error: error.message});
    }
    
});

//POST /listings/
//creates a new listing
router.post("/", tokenAuth, async function (req, res) {

    const {title, description, price, status} = req.body;
console.log("req.user:", req.user);
    try {

        const newListing = await Listing.create({title, description, price, status, seller: req.user._id});
        res.status(201).json(newListing);

    } catch (error) {

        console.error(error.message);
        res.status(400).json({error: error.message});
    }

});

//DELETE /listings/:id
//deletes a single listing based on a specified id
router.delete("/:id", tokenAuth, async function (req, res) {

    const listing = await Listing.findById(req.params.id);

    try {

        //checks to see if the listing exists
        if (!listing) {

            return res.status(404).json({messsage: "Can't Delete; Listing Doesn't Exist"});
        }

        //checks to see if the user owns this lisitng
        if (listing.seller.toString() !== req.user.user._id) {
            return res.status(401).json({ message: "Not Authorized To Delete" });
        }

        await Listing.deleteOne();
        res.status(200).json({message: "Deletion Successful"});

    } catch (error) {

        console.error(error.message);
        res.status(400).json({error: error.message});
    }
})

//UPDATE /listings/:id
//allows a user to update one of their listings
router.patch("/:id", tokenAuth, async function (req, res) {

    try {


        res.status(200).json({message: "Patch request to update a user's specific listing"});

    } catch (error) {

        console.error(error.message);
        res.status(400).json({error: error.message});
    }
})

module.exports = router;