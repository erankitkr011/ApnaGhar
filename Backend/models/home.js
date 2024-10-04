const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // Reference to the User
  room_type: { 
    type: String, 
    enum: ['flat', 'singleRoom', 'shop'], 
    required: true 
  }, // Type of room (flat, single room, or shop)
  room_number: { 
    type: Number, 
    required: true 
  }, // Room or flat number
  rent_price: { 
    type: Number, 
    required: true 
  }, // Monthly rent price for the room
  bills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bill'
  }] // Array of references to Bill schema
});

module.exports = mongoose.model('Home', HomeSchema);