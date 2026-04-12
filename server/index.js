const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas!'))
    .catch((err) => console.log('MongoDB connection error:', err));


const userRoutes = require('./routes/user');
const itemRoutes = require('./routes/item');

app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes)

app.get('/', (req, res) => {
    res.send('TU Marketplace server is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); //backticks not single quotes in ()
});