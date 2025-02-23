const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetLink: {
        type: String,
        default: "",
    },
    resetLinkExpires: {
        type: String,
        default: "",
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    secondName: {
        type: String,
        required: true,
        trim: true,
    },
    purchasedTickets: [
        {
          personalTicketId: { type: String, required: true,unique:true },
          ticketInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket', // Reference to the Ticket model
            required: true,
          },
        },
      ],
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
