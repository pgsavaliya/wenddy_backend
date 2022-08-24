const countryService = require("../../service/user/country");
const { response } = require("../../middleware/response");

exports.getcountry = async (req, res) => {
  try {
    let resp = await countryService.getcountry();
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
