const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    product: {
      type: Number,
      required: true,
    },
    user: {
      type: Number,
      required: true,
    },
    transaction: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "payment", "done"],
    },
  },
  {
    timestamps: true,
    _id: true,
    id: false,
  }
);

module.exports = model("orders", orderSchema);
