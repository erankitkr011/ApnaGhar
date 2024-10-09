const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const USER = require('../models/user');
const {sendmail} = require('./sendmail')

// Secret key for JWT
const JWT_SECRET = 'ehgjfdjh1234';

const Signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // console.log({ name, email, password, role } )
        // Check if all fields are provided
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                error: "All fields are required",
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new home/user instance
        const newUser = new USER({
            name,
            email,
            password: hashedPassword, // Save hashed password
            role,

        });

        if(newUser){
            sendmail(newUser.email,password,name)
        }
        // Save the user to the database
        await newUser.save();

        return res.status(201).json({
            message: "User successfully created and saved to the user database",
            data: newUser
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

// Login
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        
        // Find the user in the database
        const user = await USER.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = generateToken(user);

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {role: user.role}

        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
};

module.exports = { Signup, Login };
