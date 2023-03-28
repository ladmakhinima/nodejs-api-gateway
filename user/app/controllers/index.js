const UserModel = require("../models/user");
const OTPModel = require("../models/otp");
const jwt = require("jsonwebtoken");

const GetOTPCodeHandler = async (req, res) => {
  const { phone } = req.body;
  let user = await UserModel.findOne({ phone });
  if (!user) {
    user = new UserModel({ phone });
    await user.save();
  }
  const otpCode = Math.floor(Math.random() * 900000) + 100000;
  const expiresIn = new Date();
  expiresIn.setMinutes(expiresIn.getMinutes() + 1);
  await OTPModel.updateMany(
    { user: user._id },
    {
      $set: {
        isDelete: true,
      },
    }
  );
  await new OTPModel({ otpCode, user: user._id, expiresIn }).save();
  return res.status(201).json({ message: "Otp Code Send Successfully" });
};

const VerifyOTPCodeHandler = async (req, res) => {
  const { phone, otpCode } = req.body;
  const user = await UserModel.findOne({ phone });
  if (!user) {
    return res.status(404).json({ message: "Phone Or Otp Code InValid" });
  }
  const otp = await OTPModel.findOne({ user, isDelete: false });
  if (!otp) {
    return res.status(404).json({ message: "Phone Or Otp Code InValid" });
  }
  if (
    otp.retryCount === 0 ||
    new Date(otp.expiresIn).getTime() < new Date().getTime()
  ) {
    otp.isDelete = true;
    await otp.save();
    return res.status(400).json({ message: "Your OTP Code Expired ..." });
  }
  if (otp.otpCode !== otpCode) {
    otp.retryCount -= 1;
    await otp.save();
    return res.status(400).json({ message: "Invalid Code, Try Again ..." });
  }

  otp.isDelete = true;
  await otp.save();
  const token = await jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXP,
  });

  return res.status(200).json({ message: "Verify Successfully", token });
};

module.exports = { GetOTPCodeHandler, VerifyOTPCodeHandler };
