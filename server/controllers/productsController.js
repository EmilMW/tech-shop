const { Products } = require("../models/products");

async function getAllProducts(req, res) {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
async function createProduct(req, res) {
  try {
    const newProduct = await Products.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    const product = await Products.findByIdAndDelete(id);
    res.status(200).json({ result: "delete success" });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function editProduct(req, res) {
  const product = req.body;
  const id = product._id;
  delete product._id;
  try {
    await Products.findOneAndUpdate({ _id: id }, { ...product });
    const updated = await Products.findById(id);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  editProduct,
};
