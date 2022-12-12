const { response } = require("../../middleware/response");
const profileService = require("../../service/user/profile");

exports.getprofile = async (req, res) => {
  try {
    let resp = await profileService.getprofile(req.user_id);
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
    if (req.body.password || req.body.confirmPassword) {
      return response(
        "Cannot update password and confirmPassword..!!",
        {},
        400,
        res
      );
    } else {
      let resp = await profileService.update(req.params._id, req.body);
      if (resp) {
        return response("data updated successfully!!", {}, 200, res);
      } else {
        return response("something went wrong!!", {}, 500, res);
      }
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.resetpss = async (req, res) => {
  try {
    let resp = await profileService.resetpss(req.user_id, req.body);
    if (resp) {
      return response("password reset successfully!!", {}, 200, res);
    } else {
      return response("something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

// exports.delete = async (req, res) => {
//   try {
//     let resp = await profileService.delete(req.params._id);
//     if (resp) {
//       return response("Deleted successfully!!", resp.data, 200, res);
//     } else {
//       return response("Error..!!", err.error, err.status, res);
//     }
//   } catch (err) {
//     return response(err.message, err?.error, err.status, res);
//   }
// };
