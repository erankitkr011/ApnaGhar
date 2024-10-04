const USER = require('../models/user'); // Adjust the path as necessary
const Home = require('../models/home'); // Import the Home model

const getAllRoomDetails = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Fetch renter details
        const renter = await USER.findById(id);
        if (!renter) {
          return res.status(404).json({ error: 'Renter not found' });
        }
    
        // Fetch rooms allocated to the renter and populate bills
        const rooms = await Home.find({ user: id }).populate('bills');
    
        return res.status(200).json({
          message: "Renter details fetched successfully",
          renter,
          rooms,
        });
      } catch (error) {
        console.error('Error fetching renter details:', error); // Log the error
        return res.status(500).json({
          error: "Internal server error",
          details: error.message,
        });
      }
};

module.exports = {
  getAllRoomDetails,
};
