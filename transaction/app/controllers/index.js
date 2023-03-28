const TransactionModel = require("../models");

const GetTransactionsHandler = async (req, res) => {
  const defaultLimit = req.query.limit || 10;
  const defaultPage = req.query.page || 0;
  const transactions = await TransactionModel.find()
    .skip(defaultPage * defaultLimit)
    .limit(defaultLimit)
    .sort({ createdAt: -1 });
  return res.status(200).json({ transactions });
};
const GetTransactionByIdHandler = async (req, res) => {
  const _id = req.params.id;
  const transaction = await TransactionModel.findById(_id);
  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }
  return res.status(200).json({ transaction });
};
const CreateNewTransactionHandler = async (req, res) => {
  const transaction = new TransactionModel(req.body);
  await transaction.save();
  return res.status(201).json({ transaction });
};
const UpdateTransactionHandler = async (req, res) => {
  const _id = req.params.id;
  const transaction = await TransactionModel.findById(_id);
  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }
  await transaction.updateOne({ $set: req.body });
  return res
    .status(200)
    .json({ message: "Transaction updated successfully ..." });
};
const DeleteTransactionHandler = async (req, res) => {
  const _id = req.params.id;
  const transaction = await TransactionModel.findById(_id);
  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }
  await transaction.deleteOne();
  return res.status(200).json({ message: "Transaction Deleted successfully" });
};

module.exports = {
  GetTransactionsHandler,
  GetTransactionByIdHandler,
  CreateNewTransactionHandler,
  UpdateTransactionHandler,
  DeleteTransactionHandler,
};
