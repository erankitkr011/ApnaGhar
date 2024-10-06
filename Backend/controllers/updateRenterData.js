const User = require('../models/user'); // Ensure the correct path to the User model
const bcrypt = require('bcrypt'); // Import bcryptjs for password hashing

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };

    // If password is being updated, hash it before saving
    if (updatedData.password) {
      const salt = await bcrypt.genSalt(10); // Generate salt with a strength of 10 rounds
      updatedData.password = await bcrypt.hash(updatedData.password, salt); // Hash the password
    }

    console.log(id, updatedData); // Debugging purposes

    // Find the user by ID and update with the new data
    const userdata = await User.findByIdAndUpdate(id, updatedData, { new: true });

    // If the user is not found, return 404
    if (!userdata) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return success response
    res.status(200).json({ message: 'User updated successfully', userdata });
  } catch (error) {
    // Return server error response
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

module.exports = { updateUser };
