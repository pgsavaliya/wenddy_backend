const { response } = require("../../middleware/response");
const reviewService = require("../../service/user/review");

exports.addreview = async (req, res) => {
  try {
    req.body.user_id = req.user_id;
    console.log(req.body);
    let resp = await reviewService.addreview(req.body);
    if (resp) {
      return response("Added successfully..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
exports.getreview = async (req, res) => {
  try {
    // console.log(req.query.product_id);
    req.body.page = req.query.page;
    req.body.limit = req.query.limit;
    req.body.product_id = req.query.product_id;
    let resp = await reviewService.getreview(req.body);
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
//     // console.log("Pavan", req.params._id);

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

// exports.delete = async (req, res) => {
//   try {
//     let resp = await addtocartService.delete(req.params._id);
//     if (resp) {
//       return response("Deleted successfully!!", resp.data, 200, res);
//     } else {
//       return response("Error..!!", err.error, err.status, res);
//     }
//   } catch (err) {
//     return response(err.message, err?.error, err.status, res);
//   }
// };
