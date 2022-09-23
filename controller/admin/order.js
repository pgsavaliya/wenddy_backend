const orderService = require("../../service/admin/order");
const { response } = require("../../middleware/response");

exports.getorder = async (req, res) => {
  try {
    let resp = await orderService.getorder(req.query.page, req.query.limit);
    if (resp) {
      return response("SUCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.getcancelorder = async (req, res) => {
  try {
    let resp = await orderService.getcancelorder(
      req.query.page,
      req.query.limit
    );
    if (resp) {
      return response("SUCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.byId = async (req, res) => {
  try {
    let resp = await orderService.byId(req.query.id);
    if (resp) {
      return response("SUCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.update = async (req, res) => {
  try {
    let resp = await orderService.update(req.body.id, req.body.status);
    if (resp) {
      return response("SUCESS..!!", "Status Updated", 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
