const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    user: {
      type: Number,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    finalAmount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    _id: true,
    id: false,
  }
);

module.exports = model("transactions", transactionSchema);
