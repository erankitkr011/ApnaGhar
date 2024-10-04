const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  }, 
  email: { 
    type: String, 
    required: true, 
    unique: true 
  }, // User's email (must be unique)
  password: { 
    type: String, 
    required: true 
  }, // User's password (will be hashed)
  role: { 
    type: String, 
    enum: ['admin', 'renter'], 
    default: 'renter' 
  }, // Role (either admin or renter)
});

module.exports = mongoose.model('USER', UserSchema);