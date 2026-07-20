require('dotenv').config(); // Environment variables ke liye
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json());

// Email Transporter Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Aapki email
        pass: process.env.EMAIL_PASS  // Aapka App Password
    }
});

// API Route
app.post('/api/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'mariammushtaq013@gmail.com', // Jahan email aani hai
        subject: `JusticeLens Query: ${subject}`,
        text: `You have a new message from: ${name} (${email})\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!", ticketId: "JL-" + Date.now() });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email." });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
