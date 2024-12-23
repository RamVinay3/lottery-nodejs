const mongoose=require('mongoose');
const ticketSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    winnerAmount: { type: Number, required: true, min: 0 },
    priceAmount: { type: Number, required: true, min: 0 },
    targetUsers: { type: Number, required: true, min: 1 },
    description: { type: String, required: true, trim: true },
    // ticketNumber: { type: String, required: true, unique: true },
    category: { type: String, enum: ['Bronze', 'Silver', 'Gold', 'Platinum'], required: false },
    isWinner: { type: Boolean, default: false },
    winnerUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    availability: { type: Boolean, default: true },
    soldTickets: { type: Number, default: 0, min: 0 },
    maxTicketsPerUser: { type: Number, default: 1, min: 1 }
    // drawDate: { type: Date, required: true },
    // viewsCount: { type: Number, default: 0, min: 0 },
    // purchaseRate: { type: Number, default: 0, min: 0 },
    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // encryptedTicketCode: { type: String, required: true, unique: true },
    // isValid: { type: Boolean, default: true },
  }, { timestamps: true });
  
  const Ticket = mongoose.model('Ticket', ticketSchema);
  module.exports = Ticket;