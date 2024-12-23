const mongoose = require('mongoose');

const ticketPurchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true,
  },
  personalTicketId:{
    type:String,
    required:true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  purchasedAt: {
    type: Date,
    default: Date.now,
  },
});

const TicketPurchase = mongoose.model('TicketPurchase', ticketPurchaseSchema);

module.exports = TicketPurchase;
