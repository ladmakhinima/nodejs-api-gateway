const { GetOTPCodeHandler, VerifyOTPCodeHandler } = require("../controllers");

const router = require("express").Router();

router.post("/code", GetOTPCodeHandler);

router.post("/verify/code", VerifyOTPCodeHandler);

module.exports = router;
