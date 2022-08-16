const otpService = require("../service/otp");
const { response } = require("../middleware/response");

exports.sendOtp = async (req, res) => {
  try {
    console.log("email is", req.email);
    let resp = await otpService.sendOtp(req.email);
    if (resp)
      return response(
        "OTP send successfully!! OTP will delete in 5 min!!",
        {},
        200,
        res
      );
    else return response("Error..!!", {}, err.status, res);
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    let resp = await otpService.verifyOtp(req.body?.email, req.body.otp);
    if (resp) return response("SUCCESS..!!", resp.token, 200, res);
    else return response("Error..!!", {}, err.status, res);
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
