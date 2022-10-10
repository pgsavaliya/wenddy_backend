const supportModel = require("../../model/support.model");

module.exports = {
    addSupport: (data) => {
        return new Promise(async (res, rej) => {
            try {
                let newsupportModel = new supportModel(data);
                let saveData = await newsupportModel.save();
                if (saveData) {
                    res({ status: 200, data: "support Successfully!!" });
                } else {
                    rej({ status: 404, message: "something went wrong!!" });
                }
            } catch (err) {
                console.log("err ...", err);
                rej({
                    status: err?.status || 500,
                    error: err,
                    message: err?.message || "Something Went Wrong!!!",
                });
            }
        });
    },
};
