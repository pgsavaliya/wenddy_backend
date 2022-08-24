const orderService = require("../../service/user/order");
const { response } = require("../../middleware/response");

exports.order = async (req, res) => {
  try {
    req.body.user_id = req.user_id;
    // console.log(req.body);
    let resp = await orderService.order(req.body);
    if (resp) {
      // console.log(resp.data);
      res.redirect(resp.data);
      // return response("Added successfully..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
exports.payment = async (req, res) => {
  try {
    req.body.payerId = req.query.PayerID;
    req.body.paymentId = req.query.payerId;
    req.body.user_id = req.user_id;
    console.log(req.body);
    let resp = await orderService.payment(req.body);
    if (resp) {
      return response("Added successfully..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
