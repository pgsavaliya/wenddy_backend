const supportService = require("../../service/admin/support");
const { response } = require("../../middleware/response");

exports.getSupport = async (req, res) => {
    try {
        if (!req.query.page || !req.query.limit) {
            return response("pagination is require for pagination..!!", {}, 404, res);
        } else {
            let resp = await supportService.getSupport(req.query.page, req.query.limit, req.query.str);
            if (resp) {
                return response("SUCCESS..!!", resp.data, 200, res);
            } else {
                return response("Something went wrong!!", {}, 500, res);
            }
        }
    } catch (err) {
        return response(err.message, err?.error, err.status, res);
    }
};
