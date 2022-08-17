const productService = require("../../service/user/product");
const { response } = require("../../middleware/response");
const RequestIp = require("@supercharge/request-ip");

exports.getAll = async (req, res) => {
  try {
    // console.log("req.userID ............", req.user_id);
    if (!req.query.page || !req.query.limit) {
      return response("pagination is require for pagination..!!", {}, 404, res);
    } else {
      let resp = await productService.getAll({
        userId: req.user_id,
        page: req.query.page,
        limit: req.query.limit,
        str: req.query.str,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
        ring_type: req.query.ring_type,
        diamond_shape: req.query.diamond_shape,
        metal: req.query.metal,
        min: req.query.min,
        max: req.query.max,
        tag: req.query.tag,
        category: req.query.category,
      });
      if (resp) {
        // req.ip = RequestIp.getClientIp(req);
        // console.log(req.ip);
        // let ip = req.socket.localAddress;
        // let ip1 = req.ip;
        // let resp1 = await productService.addip(ip);
        // if (resp1) {
        return response("SUCESS..!!", resp.data, 200, res);
        // } else {
        //   return response("something went wrong123!!", {}, 500, res);
        // }
        // console.log("iopdfs", ip1);
      } else {
        return response("something went wrong!!", {}, 500, res);
      }
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.byId = async (req, res) => {
  try {
    let resp = await productService.byId(req.params._id);
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("Error..!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
