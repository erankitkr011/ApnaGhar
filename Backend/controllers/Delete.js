const USER = require('../models/user');
const Home = require('../models/home');
const Bill = require('../models/bill');

const deleteRenter = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Delete renter by id
      const renter = await USER.findByIdAndDelete(id);
      if (!renter) {
        return res.status(404).json({ error: 'Renter not found' });
      }
  
      // Optional: Remove related rooms and bills if necessary
      await Home.deleteMany({ user: id });
  
      return res.status(200).json({ message: 'Renter deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  };
  
  // Delete Room API
  const deleteRoom = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Delete room by id
      const room = await Home.findByIdAndDelete(id);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
  
      return res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  };
  
  // Delete Bill API
  const deleteBill = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Delete bill by id
      const bill = await Bill.findByIdAndDelete(id);
      if (!bill) {
        return res.status(404).json({ error: 'Bill not found' });
      }
  
      return res.status(200).json({ message: 'Bill deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  };


  module.exports = {deleteRenter,deleteRoom,deleteBill};