const addressService = require("../../service/user/address");
const { response } = require("../../middleware/response");

exports.add = async (req, res) => {
  try {
    let resp = await addressService.add(req.user_id, req.body);
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.addMultiAddress = async (req, res) => {
  try {
    let resp = await addressService.addMultiAddress(
      req.user_id,
      req.params._id,
      req.body
    );
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
    let resp = await addressService.update(
      req.user_id,
      req.params.address_id,
      req.body.address
    );
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

exports.deleteOne = async (req, res) => {
  try {
    let resp = await addressService.deleteOne(
      req.user_id,
      req.params.address_id
    );
    if (resp) {
      return response("SUCCESS..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};

// exports.primaryUpdate = async (req, res) => {
//     try {
//         let resp = await addressService.primaryUpdate(req.user_id, req.params._id, req.body);
//         if (resp) {
//             return response("SUCCESS..!!", resp.data, 200, res);
//         } else {
//             return response("Something went wrong!!", {}, 500, res);
//         }
//     } catch (err) {
//         return response(err.message, err?.error, err.status, res);
//     }
// };

exports.getAll = async (req, res) => {
  try {
    let resp = await addressService.getAll(req.user_id);
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
    let resp = await addressService.delete(req.params._id);
    if (resp) {
      return response("Deleted successfully..!!", resp.data, 200, res);
    } else {
      return response("Something went wrong!!", {}, 500, res);
    }
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
