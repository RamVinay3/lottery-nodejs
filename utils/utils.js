const crypto = require('crypto');

exports.generatePersonalTicketId = (ticketId) => {
  // Generate a random 4-character alphanumeric string
  const randomString = crypto.randomBytes(2).toString('hex'); // 4 characters

  // Generate a timestamp in base-36 (compact representation)
  const timestamp = Date.now().toString(36);

  // Add a high-resolution process-based unique component
  const highResTime = process.hrtime.bigint().toString(36); // Nanoseconds in base-36

  // Combine ticketId, timestamp, high-resolution time, and random string
  return `${ticketId}-${timestamp}-${highResTime}-${randomString}`;
};

// Function to generate a unique ticket number (using date and random string)
exports.generateTicketNumber = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // Format: YYYYMMDD
  const randomString = crypto.randomBytes(4).toString('hex'); // 8-character random string
  return `${date}-${randomString}`;
};