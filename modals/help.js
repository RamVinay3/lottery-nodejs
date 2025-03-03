const mongoose = require('mongoose');

// Define the Feedback schema with reference to User model
const helpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  query: {
    type: String,
    required: true,
    minlength: 10,
  },
}, {
  timestamps: true,
});

// Create the model
const Help = mongoose.model('Help', helpSchema);

module.exports = Help;
