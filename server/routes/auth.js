const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Listing = require('../models/Listing');
const tokenAuth = require("../middleware/tokenAuth");

//function to create a token so we can authenticate the user
const createToken = function (_id) {

  return jwt.sign({_id}, process.env.SECRET_TOKEN_KEY, {expiresIn: "7d"});
};



//POST /auth/register
//creates a new user account
router.post('/register', async function (req, res) {
  const { name, email, password } = req.body;

  try {

    if ( !( email.includes("@students.towson.edu") ) ) {
      
      return res.status(404).json({message: "Not a Towson University student email"})
    }

    //check if user already exists by checking the database for the given email
    var user = await User.findOne({email});
    if (user) {

        //if the user exists return a error message
        return res.status(403).json({message: "User already exists"});
    }

    //hashing the given password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating a new user with the new hashed password
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //create a token for the new user
    const token = createToken(user._id)

    //sends the reponse back to the client
    res.status(201).json({email, token});

  } catch (error) {

    console.error(error.message);
    res.status(400).json({error: error.message});
  }
});



//POST /auth/login
//lets a user login
router.post('/login', async function (req, res) {
  const {email, password} = req.body;

  try {

    //check if user exists by looking for the given email
    const user = await User.findOne({email});
    if (!user) {

      return res.status(401).json({message: "Wrong Email"});
    }

    //compares the given password to the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {

      return res.status(401).json({message: "Wrong Password"});
    }

    //create token
    const token = createToken(user._id);

    res.status(200).json({email, token});

  } catch (error) {

    console.error(error.message);
    res.status(400).json({error: error.message});
  }
});



//DELETE /auth/delete/:id
//deletes a specific user
router.delete("/delete/:id", tokenAuth, async function (req, res) {

  try {

    if (req.params.id !== req.user._id) {

      return res.status(401).json({message: "Not authorized to delete this user"})
    }

    //deletes a user's created listings
    await Listing.deleteMany({seller : req.user._id});

    //deletes the first user document found with the given id
    var userResult = await User.deleteOne({_id: req.user._id});

    if (userResult.deletedCount === 0) {

      return res.status(404).json({message: "User Doesn't Exist"})
    }
    
    res.status(200).json({message: "Deleted Successfuly"})

  } catch (error) {

    console.error(error.message);
    res.status(400).json({error: error.message});
  }
});

module.exports = router;