const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

const OTP_STORAGE = {}; // Temporary storage for OTPs

const EMAIL = "erankitkr011@gmail.com";
const PHONE = "9453699626";

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Add this to your .env
        pass: process.env.EMAIL_PASS, // Add this to your .env
    },
});

// Generate OTP
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
};

// **Send OTP to email**
const sendOTP = async (req, res) => {
    try {
        const { email, phone } = req.body;

        if (email !== EMAIL && phone !== PHONE) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        const otp = generateOTP();
        OTP_STORAGE[email || phone] = otp;
        console.log(otp);

        // Send Email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: EMAIL, 
            subject: "Your OTP for Signup",
            text: `Your OTP is: ${otp}`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Error sending OTP", details: error.message });
    }
};

// **Verify OTP**
const verifyOTP = (req, res) => {
    try {
        const { email, phone, otp } = req.body;

        if (OTP_STORAGE[email || phone] === otp) {
            delete OTP_STORAGE[email || phone]; // Remove OTP after verification
            return res.status(200).json({ message: "OTP verified successfully" });
        }

        return res.status(400).json({ error: "Invalid OTP" });
    } catch (error) {
        return res.status(500).json({ error: "Error verifying OTP", details: error.message });
    }
};

module.exports = { sendOTP, verifyOTP };
