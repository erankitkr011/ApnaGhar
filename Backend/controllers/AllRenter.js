const USER = require('../models/user'); // Adjust the path as necessary

const getAllRenters = async (req, res) => {
  try {
    const renters = await USER.find({ role: 'renter' }); // Fetch only renters
    return res.status(200).json({
      message: "Successfully fetched all renters",
      data: renters,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

module.exports = {
  getAllRenters,
};
