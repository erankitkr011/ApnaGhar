const mongoose = require('mongoose');

const AllNotifySchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('AllNotify', AllNotifySchema);