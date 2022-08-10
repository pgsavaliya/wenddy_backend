const productService = require("../../service/user/product");
const { response } = require("../../middleware/response");
// const userModel = require("../../model/user.model");

exports.getAll = async (req, res) => {
  try {
    console.log("req.userID ............", req.user_id);
    if (!req.query.page || !req.query.limit) {
      return response("pagination is require for pagination..!!", {}, 404, res);
    } else {
      //   console.log("userId: ", req.userId);
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
        min:req.query.min,
        max:req.query.max,
        tag: req.query.tag,
        category: req.query.category,
      });
      //   let userStatus;
      //   if (req.userId) {
      //     userStatus = (await userModel.findById(req.userId, { userState: 1 }))
      //       .userState;
      //   }
      if (resp) {
        return response(
          "SUCCESS..!!",
          resp.data,
          200,
          res
          //   userId: req.userId,
        );
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

exports.getByName = async (req, res) => {
  try {
    let resp = await productService.getByName({
      urlName: req.params.urlName,
      userId: req.userId,
    });
    let userStatus;
    if (req.userId) {
      userStatus = (await userModel.findById(req.userId, { userState: 1 }))
        .userState;
    }

    if (resp) {
      return responseV2({
        msg: "SUCCESS..!!",
        data: resp.data,
        code: 200,
        res: res,
        userId: req.userId,
      });
    } else {
      return response("Error..!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
