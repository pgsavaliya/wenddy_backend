const addtocartService = require("../../service/user/cart");
const { response } = require("../../middleware/response");

exports.addtocart = async (req, res) => {
  try {
    req.body.user_id = req.user_id;
    console.log(req.body);
    let resp = await addtocartService.addtocart(req.body);
    if (resp) {
      return response("Added successfully..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
exports.getcart = async (req, res) => {
  try {
    req.body.user_id = req.user_id;
    let resp = await addtocartService.getcart(req.body);
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
