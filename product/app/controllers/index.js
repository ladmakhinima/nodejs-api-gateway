const ProductModel = require("../models");

const CreateProductHandler = async (req, res) => {
  const { title, description } = req.body;
  const duplicateProduct = await ProductModel.findOne({ title });
  if (duplicateProduct) {
    return res.status(409).json({ message: "Duplicate Product Title" });
  }
  const product = new ProductModel({ title, description });
  await product.save();
  return res.status(201).json({ product });
};
const UpdateProductHandler = async (req, res) => {
  const _id = req.params.id;
  const product = await ProductModel.findById(_id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  await product.updateOne({ $set: req.body });
  return res.status(200).json({ message: "Update successfully" });
};
const DeleteProductHandler = async (req, res) => {
  const _id = req.params.id;
  const product = await ProductModel.findById(_id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  await product.deleteOne();
  return res.status(200).json({ message: "Product deleted successfully ..." });
};
const GetProductsHandler = async (req, res) => {
  const defaultPage = req.query.page || 0;
  const defaultLimit = req.query.limit || 10;
  const products = await ProductModel.find({})
    .skip(defaultLimit * defaultPage)
    .limit(defaultLimit)
    .sort({ createdAt: -1 });
  return res.status(200).json({ products });
};
const GetSingleProductHandler = async (req, res) => {
  const _id = req.params.id;
  const product = await ProductModel.findById(_id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.status(200).json({ product });
};

module.exports = {
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
  GetProductsHandler,
  GetSingleProductHandler,
};
