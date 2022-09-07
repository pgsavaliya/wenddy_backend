const countryService = require("../../service/admin/country");
const { response } = require("../../middleware/response");

exports.addcountry = async (req, res) => {
  try {
    let resp = await countryService.addcountry(req.body);
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
exports.deletecountry = async (req, res) => {
  try {
    let resp = await countryService.deletecountry(req.body);
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
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
