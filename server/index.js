const express = require('express');
const cors = require('cors');
require('dotenv').config({debug: true });

const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas!'))
    .catch((err) => console.log('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('TU Marketplace server is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); //backticks not single quotes in ()
});
