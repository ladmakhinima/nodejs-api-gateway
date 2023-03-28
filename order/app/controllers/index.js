const OrderModel = require("../models");

const GetOrdersHandler = async (req, res) => {
  const defaultLimit = req.query.limit || 10;
  const defaultPage = req.query.page || 0;
  const orders = OrderModel.find()
    .limit(defaultPage * defaultLimit)
    .skip(defaultLimit)
    .sort({ createdAt: -1 });
  return res.status(200).json({ orders });
};
const GetOrdersByIdHandler = async (req, res) => {
  const _id = req.params.id;
  const order = await OrderModel.findById(_id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  return res.status(200).json({ order });
};
const CreateOrderHandler = async (req, res) => {
  const order = new OrderModel(req.body);
  await order.save();
  return res.status(201).json({ order });
};
const UpdateOrderHandler = async (req, res) => {
  const _id = req.params.id;
  const order = await OrderModel.findById(_id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  await order.updateOne({ $set: req.body });
  return res.status(200).json({ message: "Order updated successfully ..." });
};
const DeleteOrderHandler = async (req, res) => {
  const _id = req.params.id;
  const order = await OrderModel.findById(_id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  await order.deleteOne();
  return res.status(200).json({ message: "Order Deleted successfully" });
};

module.exports = {
  GetOrdersHandler,
  GetOrdersByIdHandler,
  CreateOrderHandler,
  UpdateOrderHandler,
  DeleteOrderHandler,
};
