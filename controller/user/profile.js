const { response } = require("../../middleware/response");
const profileService = require("../../service/user/profile");

exports.getprofile = async (req, res) => {
  try {
    let resp = await profileService.getprofile(req);
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.update = async (req, res) => {
  try {
    let resp = await profileService.update(req.params._id, req.body);
    if (resp) {
      return response("data updated successfully!!", {}, 200, res);
    } else {
      return response("something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

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
