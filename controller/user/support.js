const supportService = require("../../service/user/support");
const { response } = require("../../middleware/response");

exports.addSupport = async (req, res) => {
  try {
    let resp = await supportService.addSupport(req.body);
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
