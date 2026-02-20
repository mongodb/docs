require('dotenv').config();
const mongoose = require("mongoose");

module.exports = async (uri, options = {}) => {
  // By default, Mongoose skips properties not defined in the schema (strictQuery). 
  // You can adjust it based on your configuration.
  mongoose.set('strictQuery', true);

  // Connect to MongoDB
  try {
    await mongoose.connect(uri, options);
    console.info("MongoDB primary connection initiated");
  } catch (err) {
    console.error("MongoDB primary connection failed, " + err);
  }

  // Event handling
  mongoose.connection.once('open', () => console.info("MongoDB primary connection opened!"));
  mongoose.connection.on('connected', () => console.info("MongoDB primary connection succeeded!"));
  mongoose.connection.on('error', (err) => {
    console.error("MongoDB primary connection failed, " + err);
    mongoose.disconnect();
  });
  mongoose.connection.on('disconnected', () => console.info("MongoDB primary connection disconnected!"));

  // Graceful exit
  process.on('SIGINT', async () => {
    try {
      await mongoose.connection.close();
      console.info("Mongoose primary connection disconnected through app termination!");
      process.exit(0);
    } catch (err) {
      console.error("Error during graceful shutdown:", err);
      process.exit(1);
    }
  });
}