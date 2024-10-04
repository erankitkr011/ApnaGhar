const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  home: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home',
    required: true
  }, // Reference to the Home
  month: {
    type: String,
    required: true
  }, // Month for which the bill is recorded
  electric_bill_units: { 
    type: Number, 
    default: 0 
  }, // Electric units consumed (admin updates this)
  electric_bill_rate: { 
    type: Number, 
    default: 7 
  }, // Rate per unit for electricity (₹7/unit)
  total_bill: { 
    type: Number, 
    default: 0 
  }, // Total bill: rent + (electric units * rate)
  is_paid: { 
    type: Boolean, 
    default: false 
  }, // Payment status
});

module.exports = mongoose.model('Bill', BillSchema);