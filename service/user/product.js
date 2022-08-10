const productModel = require("../../model/product.model");

module.exports = {
  getAll: ({ page, limit, str, startDate, endDate, userId, category, ring_type, diamond_shape, metal, min, max, tag }) => {
    return new Promise(async (res, rej) => {
      try {
        let qry = {};
        page = parseInt(page);
        limit = parseInt(limit);
        if (startDate && endDate) {
          startDate = new Date(startDate);
          endDate = new Date(endDate);
          endDate.setDate(endDate.getDate() + 1);
          qry["$and"] = [
            { createdAt: { $gt: startDate } },
            { createdAt: { $lt: endDate } },
          ];
        }
        let categoryArray;
        if (category) categoryArray = category.split(",");
        let ring_type_array;
        if (ring_type) ring_type_array = ring_type.split(",");
        let diamond_shape_array;
        if (diamond_shape) diamond_shape_array = diamond_shape.split(",");
        let tag_array;
        if (tag) tag_array = tag.split(",");
        if (str) {
          qry["$or"] = [
            { product_title: { $regex: str, $options: "i" } },
          ];
        }
        if (metal) qry["metal"] = metal;
        if (category) qry["category"] = { $in: categoryArray };
        if (ring_type) qry["ring_type"] = { $in: ring_type_array };
        if (diamond_shape) qry["diamond_shape"] = { $in: diamond_shape_array };
        if (tag) qry["tag"] = { $in: tag_array };
        if (min && max) {
          qry["mrp"] =
          {
            $gte: parseInt(min),
            $lte: parseInt(max)
          };
        }
        console.log("userId: ", userId);
        console.log("qry ...........", qry);
        let getData = await productModel.aggregate([
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
          getData.result = getData.result.map((item, index) => {
            return {
              ...item,
              index: getData.total_count[0].count - index
            }
          })
          res({
            status: 200,
            data: {
              total_count: getData.total_count[0].count,
              result: getData.result,
            },
          });
        } else {
          rej({ status: 404, message: "No Data found!!" });
        }
      } catch (err) {
        console.log("err ....", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  byId: (_id) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await productModel.findById(_id);
        if (getData) {
          res({ status: 200, data: getData });
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log(err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  //     getByName: ({ urlName, userId }) => {
  //         return new Promise(async (res, rej) => {
  //             try {
  //                 console.log("userId ...........", userId);
  //                 console.log("urlName ...........", urlName);
  //                 let watchlistOfUser = [];
  //                 if (userId)
  //                     watchlistOfUser =
  //                         (await watchlistModel.findOne({ userId }, { properties: 1 }))
  //                             ?.properties || [];
  //                 let getData = await productModel.aggregate([
  //                     {
  //                         $match: { urlName: urlName }
  //                     },
  //                     { $addFields: { is_fav: { $in: ["$_id", watchlistOfUser] } } },
  //                     { $limit: 1 },
  //                 ]);
  //                 console.log("getData .......", getData);

  //                 let balance = await walletService.getBalance(userId);
  //                 console.log("balance .....", balance);

  //                 let propertyId = mongoose.Types.ObjectId(getData[0]._id);
  //                 let existData = await transactionModel.find({
  //                     idOfCompanyProperty: mongoose.Types.ObjectId(getData[0]._id),
  //                 });
  //                 console.log("existData ......", existData.length);
  //                 if (existData.length > 0) {
  //                     let trasactionData = await transactionModel.aggregate([
  //                         { $match: { idOfCompanyProperty: propertyId } },
  //                         {
  //                             $group: {
  //                                 _id: "$customerId",
  //                                 totalInvestment: { $sum: "$totalAmount" },
  //                             },
  //                         },
  //                         {
  //                             $group: {
  //                                 _id: null,
  //                                 totalInvestment: { $sum: "$totalInvestment" },
  //                                 totalInvestors: { $sum: 1 },
  //                             },
  //                         },
  //                     ]);
  //                     console.log("trasactionData ..........", trasactionData);
  //                     let funded =
  //                         (trasactionData[0].totalInvestment / getData[0].totalAmount) * 100;
  //                     console.log("funded ........", funded);
  //                     if (getData[0]) {
  //                         res({
  //                             status: 200,
  //                             data: {
  //                                 totalInvestment: trasactionData[0].totalInvestment || 0,
  //                                 totalInvestors: trasactionData[0].totalInvestors,
  //                                 Funded: funded,
  //                                 balance: balance,
  //                                 result: getData[0],
  //                             },
  //                         });
  //                     } else {
  //                         rej({ status: 404, message: "Property Not Found", error: {} });
  //                     }
  //                 } else {
  //                     res({ status: 200, data: { balance: balance, result: getData[0] } });
  //                 }
  //                 rej({ status: 404, message: "Property Not Found", error: {} });
  //             } catch (err) {
  //                 console.log(err);
  //                 rej({ status: 500, error: err, message: "something went wrong!!" });
  //             }
  //         });
  //     },
};
