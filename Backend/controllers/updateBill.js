const Bill = require('../models/bill');

const updateBill = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        // console.log(id,updatedData)
    
        const bill = await Bill.findByIdAndUpdate(id, updatedData, { new: true });
        if (!bill) {
          return res.status(404).json({ error: 'Bill not found' });
        }
    
        res.status(200).json({ message: 'Bill updated successfully', bill });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
      }
};

module.exports = {updateBill};
