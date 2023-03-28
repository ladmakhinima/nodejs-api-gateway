const { Schema, model } = require("mongoose");
const base = require("./base");

const otpSchema = new Schema(
  {
    otpCode: { required: true, type: Number },
    user: { required: true, type: Schema.Types.ObjectId, ref: "users" },
    expiresIn: { required: true, type: Date },
    retryCount: { required: false, type: Number, default: 3 },
    isDelete: { required: false, type: Boolean, default: false },
  },
  base
);

module.exports = model("otps", otpSchema);
