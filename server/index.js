const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas!'))
    .catch((err) => console.log('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

const User = mongoose.model("User", {
    email: String,
    ratings: [
        {
            rating: Number,
            fromUser: String
        }
    ]
});

app.get('/', (req, res) => {
    res.send('TU Marketplace server is running!');
});

app.post("/rate-user", async (req, res) => {
    try {
        const { sellerEmail, rating, fromUser } = req.body;

        let user = await User.findOne({ email: sellerEmail });

        if (!user) {
            user = new User({
                email: sellerEmail,
                ratings: []
            });
        }

        user.ratings.push({
            rating: Number(rating),
            fromUser
        });

        await user.save();

        res.json({ message: "Rating saved successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); //backticks not single quotes in ()
});
