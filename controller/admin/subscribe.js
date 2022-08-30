const subscribeService = require("../../service/admin/subscribe");
const { response } = require("../../middleware/response");

exports.getsubscribe = async (req, res) => {
  try {
    let resp = await subscribeService.getsubscribe();
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
