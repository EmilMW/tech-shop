const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is missing"],
  },
  description: {
    type: String,
    required: [true, "Product description is missing"],
  },
  price: {
    type: Number,
    required: [true, "Product price is missing"],
  },
  imgUrl: {
    type: String,
    required: [true, "Image url is missing"],
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const Products = mongoose.model("products", productSchema);

module.exports = {
  Products,
};
