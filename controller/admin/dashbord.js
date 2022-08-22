const dashbordService = require("../../service/admin/dashbord");
const { response } = require("../../middleware/response");

exports.get = async (req, res) => {
  try {
    let resp = await dashbordService.get(req);
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
