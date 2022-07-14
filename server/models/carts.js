const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Cart username is missing"],
  },
  items: {
    type: Object,
    default: {},
  },
});

const Carts = mongoose.model("carts", cartSchema);

module.exports = { Carts };
