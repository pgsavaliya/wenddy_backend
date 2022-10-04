const addtocartService = require("../../service/user/cart");
const { response } = require("../../middleware/response");

exports.addtocart = async (req, res) => {
  try {
    let resp = await addtocartService.addtocart(req.user_id, req.body);
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
exports.getcart = async (req, res) => {
  try {
    let resp = await addtocartService.getcart({
      user_id: req.user_id,
      country: req.query.country,
    });
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

// exports.update = async (req, res) => {
//   try {
//     let resp = await addtocartService.update(req.params._id, req.body);
//     if (resp) {
//       return response("data updated successfully!!", {}, 200, res);
//     } else {
//       return response("something went wrong!!", {}, 500, res);
//     }
//   } catch (err) {
//     return response(err.message, err?.error, err.status, res);
//   }
// };

exports.delete = async (req, res) => {
  try {
    let resp = await addtocartService.delete(req.params._id);
    if (resp) {
      return response("Deleted successfully!!", resp.data, 200, res);
    } else {
      return response("Something went worng!!", err.error, err.status, res); //message change kr
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.deleteall = async (req, res) => {
  try {
    let resp = await addtocartService.deleteall(req.user_id);
    if (resp) {
      return response("Deleted successfully!!", resp.data, 200, res);
    } else {
      return response("Something went worng!!", err.error, err.status, res); //same
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
