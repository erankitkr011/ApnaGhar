const Home = require('../models/home'); // Adjust the path as necessary
const USER = require('../models/user'); // Adjust the path as necessary

const allocateRoom = async (req, res) => {
  const { userId, room_type, room_number, rent_price } = req.body;

  try {
    // Validate the user ID
    const user = await USER.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new room allocation
    const newRoom = new Home({
      user: userId,
      room_type,
      room_number,
      rent_price,
    });

    // Save the room to the database
    await newRoom.save();

    return res.status(201).json({
      message: 'Room allocated successfully',
      data: newRoom,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
};

module.exports = {
  allocateRoom,
};
