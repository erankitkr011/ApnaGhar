const Bill = require('../models/bill');
const Home = require('../models/home');

// Create a new bill
const createBill = async (req, res) => {
  try {
    const { homeId, month, electric_bill_units, electric_bill_rate, total_bill, is_paid } = req.body;

    // Find the home by ID
    const home = await Home.findById(homeId);
    if (!home) {
      return res.status(404).json({ error: 'Home not found' });
    }

    // Create a new bill
    const bill = new Bill({
      home: home._id,
      month,
      electric_bill_units,
      electric_bill_rate,
      total_bill,
      is_paid
    });

    // Save the bill
    await bill.save();

    // Add the bill reference to the home
    home.bills.push(bill._id);
    await home.save();

    res.status(201).json({ message: 'Bill created successfully', bill });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

module.exports = {
  createBill
};