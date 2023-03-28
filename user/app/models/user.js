const { Schema, model } = require("mongoose");
const base = require("./base");

const userSchema = new Schema(
  {
    username: { type: String, required: false, default: "" },
    phone: { type: String, required: true },
  },
  base
);

module.exports = model("users", userSchema);
