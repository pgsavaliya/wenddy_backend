const supportModel = require("../../model/support.model");

module.exports = {
    getSupport: (page, limit, str) => {
        return new Promise(async (res, rej) => {
            try {
                let qry = {};
                page = parseInt(page);
                limit = parseInt(limit);
                if (str) { qry = { name: { $regex: str, $options: "i" } }; }
                let getData = await supportModel.aggregate([
                    { $match: qry },
                    {
                        $facet: {
                            total_count: [
                                {
                                    $group: {
                                        _id: null,
                                        count: { $sum: 1 },
                                    },
                                },
                            ],
                            result: [
                                {
                                    $project: {
                                        __v: 0,
                                    },
                                },
                                { $sort: { createdAt: -1 } },
                                { $skip: (page - 1) * limit },
                                { $limit: limit },
                            ],
                        },
                    },
                ]);
                getData = getData[0];
                if (getData.result.length > 0) {
                    res({
                        status: 200,
                        data: {
                            total_count: getData.total_count[0].count,
                            result: getData.result,
                        },
                    });
                } else {
                    rej({ status: 404, message: "No Data Found!!" });
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
