const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const tokenAuth = require("../middleware/tokenAuth");

//function to create a token so we can authenticate the user
const createToken = function (_id) {

  return jwt.sign({_id}, process.env.SECRET_TOKEN_KEY, {expiresIn: "3d"});
};



//POST /auth/register
//creates a new user account
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {

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
router.post('/login', async (req, res) => {
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



//DELETE /auth/delete
//deletes a specific user
router.delete("/:id", tokenAuth, async function (req, res) {

  const userID = req.user.id;

  try {

    const user = await User.findById(id);

    //deletes the first user document found with the given email
    var result = await User.deleteOne({_id: _id});

    if (result.deletedCount === 0) {

      return res.status(404).json({message: "User Doesn't Exist"})
    }
    
    res.status(200).json({message: "Deleted Successfuly"})

  } catch (error) {

    console.error(error.message);
    res.status(400).json({error: error.message});
  }
});

module.exports = router;