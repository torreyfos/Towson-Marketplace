const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const tokenAuth = require("../middleware/tokenAuth");

//performs all the CRUD operations on the listings

//GET /listings/
//retreive all listings ()
router.get("/", async function (req, res) {

    try {

        const allListings = await Listing.find({}).sort({createdAt: -1});

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
        if (listing.seller.toString() !== req.user._id) {
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

    const {title, description, price, status} = req.body;
    try {

        const updateListing = await Listing.findById(req.params.id);

        //checks to see if listing exists
        if(!updateListing) {

            return res.status(404).json({message: "Listing Doesn't Exist"});
        }

        //checks to see if user owns the listing
        if (updateListing.seller.toString() !== req.user._id) {
            return res.status(401).json({message: "Not Authorized To Update"});
        }

        //checks to see if the field the user gave exists before saving it to the listing
        if (title !== undefined) {
            updateListing.title = title;
        }
        if (description !== undefined) {
            updateListing.description = description;
        }
        if (price !== undefined) {
            updateListing.price = price;
        }
        if (status !== undefined) {
            updateListing.status = status;
        }

        await updateListing.save();
        res.status(200).json({updateListing});

    } catch (error) {

        console.error(error.message);
        res.status(400).json({error: error.message});
    }
})

module.exports = router;