require('dotenv').config({debug: true });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

//Connects to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        
        //database connection message
        console.log('Connected to MongoDB Atlas!')

        //starts listening for incoming requests once connected to the database
        app.listen(PORT, () => {
            console.log("Server running on port", `${PORT}`); //backticks not single quotes in ()
        });
    })

    .catch((err) => console.log('MongoDB connection error:', err));

    //middleware
    app.use(cors());
    app.use(express.json());

    app.get('/', (req, res) => {
    res.send('TU Marketplace server is running!');
});

//will run the "/routes/auth.js" file for requests that match "/auth"
app.use('/auth', require('./routes/auth'));

//will run the "/routes/listings.js" file when "/listings" is in the URL
app.use("/listings", require("./routes/listings"));


