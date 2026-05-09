const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const tokenAuth = require("../middleware/tokenAuth");
const {upload} = require('../cloudinary');

//performs all the CRUD operations on the listings

//GET /listings/
//retreive all listings ()
router.get("/", async function (req, res) {

    try {

        const allListings = await Listing.find({}).sort({createdAt: -1}).populate("seller", "name email");

        res.status(200).json(allListings);

    } catch (error) {

        console.log(error.mesaage);
        res.status(400).json({error: error.message});
    }

});



//POST /listings/
//creates a new listing
router.post("/", tokenAuth, upload.array('images', 5), async function (req, res) {

    const {title, description, price, status, category} = req.body;

    try {
        const imageUrls = req.files ? req.files.map(file => file.path) : [];

        const newListing = await Listing.create({
            title, 
            description, 
            price, 
            status, 
            seller: req.user._id, 
            category,
            images: imageUrls
        });
        res.status(201).json(newListing);

    } catch (error) {

        console.error(error.message);
        res.status(400).json({error: error.message});
    }

});



//GET /listings/my
//returns all of a specific user's listings
router.get("/my", tokenAuth, async function (req, res) {

    try {
        const userListings = await Listing.find({seller: req.user._id}).sort({createdAT: -1}).populate("seller", "name email");
        res.status(200).json(userListings);

    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.messgae});
    }
});



//GET /listings/search
//searches for specific listings based on the title and category sent from the client
router.get("/search", async function (req, res) {

    try {
        const { searchTitle, searchCategory } = req.query;
        let filter = {};

        //create the filter object
        if (searchTitle && searchTitle.trim() !== "") {

            //case‑insensitive partial match on title
            filter.title = { $regex: searchTitle, $options: "i" };
        }

        if (searchCategory && searchCategory.trim() !== "" && searchCategory !== "All") {
            filter.category = searchCategory;
        }

        //if both are empty/All, filter stays {} and returns all listings
        const searchedListings = await Listing.find(filter).sort({ createdAt: -1 }).populate("seller", "name email");

        res.status(200).json(searchedListings);

    } catch (error) {
        console.error("Search error:", error.message);
        res.status(400).json({ error: error.message });
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

        console.error("Search error: ", error.message);
        res.status(400).json({error: error.message});
    }
    
});




//DELETE /listings/:id
//deletes a single listing based on a specified id
router.delete("/:id", tokenAuth, async function (req, res) {

    try {

        const listingToDelete = await Listing.findById(req.params.id);

        //checks to see if the listing exists
        if (!listingToDelete) {

            return res.status(404).json({messsage: "Can't Delete; Listing Doesn't Exist"});
        }

        //checks to see if the user owns this lisitng
        if (listingToDelete.seller.toString() !== req.user._id) {
            return res.status(401).json({ message: "Not Authorized To Delete" });
        }

        await Listing.deleteOne(listingToDelete);
        res.status(200).json({message: "Deletion Successful"});

    } catch (error) {

        console.error(error.message);
        res.status(400).json({error: error.message});
    }
})



//PATCH /listings/:id
//allows a user to update one of their listings
router.patch("/:id", tokenAuth, async function (req, res) {

    const {title, description, price, status, category} = req.body;
    try {

        const updateListing = await Listing.findById(req.params.id);

        //checks to see if listing exists
        if(!updateListing) {

            return res.status(404).json({message: "Listing Doesn't Exist"});
        }

        //checks to see if the user owns this lisitng
        if (updateListing.seller.toString() !== req.user._id) {
            return res.status(401).json({ message: "Not Authorized To Update" });
        }

        //checks to see if the field the user gave exists before saving it to the listing
        if (title !== undefined || title !== "" ) {
            updateListing.title = title;
        }
        if (description !== undefined || description !== "" ) {
            updateListing.description = description;
        }
        if (price !== undefined || price !== "" ) {
            updateListing.price = price;
        }
        if(status !== undefined){
            updateListing.status = status;
        }
        if(category !== undefined){
            updateListing.category = category;
        }
        
        await updateListing.save();
        res.status(200).json({updateListing});

    } catch (error) {

        console.error(error.message);
        res.status(400).json({error: error.message});
    }
})

module.exports = router;