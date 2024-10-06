const Home = require('../models/home'); // Ensure the correct path to the Home model
const getHomeDetails = async (req, res) => {
    try {
      const userId = req.user.id; // Extract user ID from the verified JWT
      console.log('User ID:', userId); // Log the user ID
  
      const home = await Home.findOne({ user: userId }).populate('bills').exec()
      if (!home) {
        return res.status(404).json({ error: 'Home not found' });
      }
  
      res.status(200).json({ home });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  };

module.exports = { getHomeDetails };