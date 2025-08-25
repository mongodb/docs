const mongoose = require("mongoose");

module.exports = (options = {}) => {
  // Schema for Product
  return new mongoose.Schema(
    {
      store: {
        _id: mongoose.Types.ObjectId, // Reference-id to the store collection
        name: String
        },
        name: String,
        price: Number,
        category: String,
        description: String
        // add required properties
  }, 
      options
  );
}