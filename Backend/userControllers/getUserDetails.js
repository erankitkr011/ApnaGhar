
const User = require('../models/user') // Ensure the correct path to the User model
const getUserDetails = async (req, res) => {
    
  try {
    const userId = req.user.id;
   // console.log(userId)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

module.exports = { getUserDetails };