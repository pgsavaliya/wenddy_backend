const addtocartService = require("../../service/user/addtocart");
const { response } = require("../../middleware/response");

exports.addtocart = async (req, res) => {
  try {
    req.body.userId = req.userId;
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
