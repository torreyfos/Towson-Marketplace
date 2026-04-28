const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const tokenAuth = require("../middleware/tokenAuth");

// Configure transporter once (use environment variables for credentials)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: "njevnejrvnrevnrevnro4@gmail.com", //the email address for our website
    pass: process.env.TU_MARKETPLACE_EMAIL_PASSWORD
  }
});

router.post('/', tokenAuth, async (req, res) => {
  try {
    const { buyerEmail, sellerEmail, subject, message } = req.body;

    const mailOptions = {
      from: '"TU Marketplace" <njevnejrvnrevnrevnro4@gmail.com>',
      replyTo: buyerEmail, // replies go directly to the buyer
      to: sellerEmail,
      subject: `${subject}`,
      text: `Message from ${buyerEmail}:\n\n${message}`
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true });

  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;