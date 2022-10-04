const orderService = require("../../service/admin/order");
const { response } = require("../../middleware/response");

exports.getorder = async (req, res) => {
  try {
    if (!req.query.page && !req.query.limit) {
      return response("pagination is require for pagination", {}, 404, res);
    } else {
      let resp = await orderService.getorder(req.query.page, req.query.limit);
      if (resp) {
        console.log(resp);
        return response("SUCESS..!!", resp.data, 200, res);
      } else {
        return response("Something went wrong!!", {}, 500, res);
      }
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.getcancelorder = async (req, res) => {
  try {
    if (!req.query.page && !req.query.limit) {
      return response("pagination is require for pagination!!", {}, 404, res);
    } else {
      let resp = await orderService.getcancelorder(
        req.query.page,
        req.query.limit
      );
      if (resp) {
        return response("SUCESS..!!", resp.data, 200, res);
      } else {
        return response("Something went wrong!!", {}, 500, res);
      }
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
      return response("SUCESS..!!", { data: "status updated" }, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
