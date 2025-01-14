const mongoose = require("mongoose");

const Ticket = require("../modals/Ticket");
const TicketPurchase = require("../modals/ticketPurchase");
const User = require("../modals/User");
const util = require("../utils/utils");

exports.getAvailableTickets = async (req, res, next) => {
  try {
    // Query to fetch tickets where sold is less than targetUsers
    const tickets = await Ticket.find({
      $expr: { $lt: ["$sold", "$targetUsers"] },
    });

    // Prepare the response
    return res.json({
      success: true,
      tickets: tickets.map((ticket) => ({
        ticketId: ticket._id.toString(),
        name: ticket.name,
        winnerAmount: ticket.winnerAmount,
        price: ticket.priceAmount,
        sold: ticket.soldTickets,
        targetUsers: ticket.targetUsers,
        description: ticket.description,
       
      })),
    });
  } catch (error) {
   const err= new Error("Unexpected Error while fetching available tickets");
    next(err);
  }
};

//-------------------------buying ticket module ----------------------
const buyTicket = async (userId, ticketId, quantity) => {
  try {
    // Find the ticket
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    // Check if the user has already reached the max limit for this ticket
    const userTickets = user.purchasedTickets.filter(
      (pt) => pt.ticketInfo.toString() === ticketId
    );
    
   
    if (userTickets.length >= (ticket.maxTicketsPerUser || Infinity)) {
      throw new Error(
        "You have reached the maximum purchase limit for this ticket"
      );
    }

    // Generate a personal ticket ID
    const personalTicketId = util.generatePersonalTicketId(
      userId,
      ticket.ticketId
    );
    //updating user info regardging tickets
    user.purchasedTickets.push({
      personalTicketId,
      ticketInfo: ticket._id,
    });
    // Save the user
    await user.save();

    ticket.soldTickets += quantity;
    ticket.save();

    // saving in another database , kinda feels like log to check if incase.
    const newPurchase = new TicketPurchase({
     'userId': userId,
      'ticketId':ticketId,
      'personalTicketId':personalTicketId,
      'quantity':quantity,
    });

    await newPurchase.save();
    return true;
  } catch (error) {

    throw error;
    
  }
};

exports.processTicket = async (req, res, next) => {
  const userId = req.user.userId;
  const ticketId = req.body.tickedId;
  const qunatity = 1;
  try{
    var bought = await buyTicket(userId, ticketId, qunatity);
 
  if (bought) {
    return res.json({
      errCode: 0,
      errMsg: "Thank you for purchasing ticket",
    });
  }
  }
  catch(err){
    
   
    next(err);
  }
  
};

//------------------------this will fetch purchased tickets by the user-------------------------------------
async function getUserTickets(userId) {
  try {
    // Fetch the user with their purchased tickets populated
    const user = await User.findById(userId).populate(
      "purchasedTickets.ticketInfo"
    );

    if (!user) {
      throw new Error("User not found");
    }

    // Prepare the response
    const tickets = user.purchasedTickets.map((ticket) => ({
      personalTicketId: ticket.personalTicketId,
      ticketInfo: {
        
        name: ticket.ticketInfo.name,
        winnerAmount: ticket.ticketInfo.winnerAmount,
        price: ticket.ticketInfo.priceAmount,
        targetUsers: ticket.ticketInfo.targetUsers,
        description: ticket.ticketInfo.description,
        
      },
    }));

    return {
      success: true,
      userId: user._id,
      email: user.email,
      tickets,
    };
  } catch (error) {
   
    throw error;
  }
}

exports.purchasedTickets = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const result = await getUserTickets(userId);

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//------------------------this will create ticket by admin-------------------------------------

exports.createTicket = async (req, res, next) => {
  try {
    const {
      name,
      winnerAmount,
      price,
      targetUsers,
      description,
      
    } = req.body;

    // Validate required fields
    if (!name || !winnerAmount || !price || !targetUsers) {
      return res.status(400).json({ message: "Missing required fields." });
    }

   

    // Create a new ticket instance
    const newTicket = new Ticket({
    
     'name': name,
     'winnerAmount':winnerAmount,
      'priceAmount':price,
      'targetUsers':targetUsers,
      'description':description,
    });

    // Save the ticket to the database
    const savedTicket = await newTicket.save();

    // Return the created ticket
    res.status(201).json({
      success: true,
      ticket: savedTicket,
    });
  } catch (error) {
    
    next(error);
  }
};
