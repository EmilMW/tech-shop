const { Carts } = require("../models/carts");
const { Products } = require("../models/products");

async function getUserCart(req, res) {
  const { username } = req.params;
  try {
    const [userCart] = await Carts.find({ username });
    const cart = [];
    for (const [itemId, quantity] of Object.entries(userCart.items)) {
      const product = await Products.findById(itemId);
      cart.push({ product, quantity });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function addToCart(req, res) {
  const { itemId, quantity } = req.params;
  const username = res.locals.token._doc.username;
  try {
    const cart = await Carts.findOne({ username });
    if (cart) {
      const { items } = cart;
      if (items[itemId]) {
        items[itemId] = parseInt(items[itemId]) + parseInt(quantity);
      } else {
        items[itemId] = parseInt(quantity);
      }
      await Carts.findOneAndUpdate({ username }, { items });
      res.status(200).json(items);
      return;
    }

    const items = { [itemId]: quantity };
    const newCart = new Carts({ username, items });
    await newCart.save();
    res.status(201).json(items);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function deleteFromCart(req, res) {
  const username = res.locals.token._doc.username;
  const { itemId } = req.params;
  try {
    const cart = await Carts.findOne({ username });
    if (cart) {
      const { items } = cart;
      delete items[itemId];
      await Carts.findOneAndUpdate({ username }, { items });
      res.status(200).json(items);
      return;
    }
    res.status(404).json({
      message: "Cart not found",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function updateItemQuantity(req, res) {
  const username = res.locals.token._doc.username;
  const { itemId, quantity } = req.params;
  try {
    const cart = await Carts.findOne({ username });
    if (cart) {
      const { items } = cart;
      items[itemId] = parseInt(quantity);
      await Carts.findOneAndUpdate({ username }, { items });
      res.status(200).json(items);
      return;
    }
    res.status(404).json({
      message: "Cart not found",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = { getUserCart, addToCart, deleteFromCart, updateItemQuantity };
