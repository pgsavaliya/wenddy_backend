// const addtocartService = require("../../service/user/cart");
const { response } = require("../../middleware/response");
const wishlistService = require("../../service/user/wishlist");

exports.addwishlist = async (req, res) => {
  try {
    console.log(req.body);
    let resp = await wishlistService.addwishlist(req.user_id, req.body);
    if (resp) {
      return response("success..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.getwishlist = async (req, res) => {
  try {
    console.log("req.user_id ........", req.user_id);
    let resp = await wishlistService.getwishlist(req.user_id);
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
    let resp = await wishlistService.delete(req.user_id, req.body.product_id);
    if (resp) {
      return response("Deleted successfully!!", resp.data, 200, res);
    } else {
      return response("Error..!!", err.error, err.status, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

// exports.update = async (req, res) => {
//   try {
//     // console.log("Pavan", req.body);

//     let resp = await wishlistService.update(req.user_id, req.body.product_id);
//     if (resp) {
//       return response("data updated successfully!!", {}, 200, res);
//     } else {
//       return response("something went wrong!!", {}, 500, res);
//     }
//   } catch (err) {
//     return response(err.message, err?.error, err.status, res);
//   }
// };
