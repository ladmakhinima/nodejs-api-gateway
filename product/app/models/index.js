const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
    _id: true,
    id: false,
  }
);

module.exports = model("products", productSchema);
