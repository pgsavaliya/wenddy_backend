const shippingService = require("../../service/admin/shipping");
const { response } = require("../../middleware/response");

exports.addshipping = async (req, res) => {
  try {
    let resp = await shippingService.addshipping(req.body);
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.delete = async (req, res) => {
  try {
    let resp = await shippingService.delete(req.params._id);
    if (resp) {
      return response("Deleted successfully!!", resp.data, 200, res);
    } else {
      return response("Something went worng..!!", err.error, err.status, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.getshipping = async (req, res) => {
  try {
    let resp = await shippingService.getshipping(
      req.query.profile_name,
      req.query.name
    );
    if (resp) {
      return response("SUCESS!!", resp.data, 200, res);
    } else {
      return response("Something went worng!!", err.error, err.status, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.update = async (req, res) => {
  try {
    let resp = await shippingService.update(
      req.body.profile_name,
      req.body.country,
      req.body.data
    );
    if (resp) {
      return response("SUCESS!!", resp.data, 200, res);
    } else {
      return response("Something went worng!!", err.error, err.status, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
