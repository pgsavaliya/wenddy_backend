const productModel = require("../../model/product.model");
const ipModel = require("../../model/ip.model");
const countryModel = require("../../model/country.model");
const reviewproductModel = require("../../model/reviewproduct.model");

module.exports = {
  getAll: ({
    page,
    limit,
    str,
    startDate,
    endDate,
    userId,
    category,
    ring_type,
    diamond_shape,
    metal,
    min,
    max,
    tag,
    country,
  }) => {
    return new Promise(async (res, rej) => {
      try {
        //find data
        let qry = {};
        page = parseInt(page);
        limit = parseInt(limit);
        // console.log("limit ....", limit);
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
          qry["$or"] = [{ product_title: { $regex: str, $options: "i" } }];
        }
        if (metal) qry["metal"] = metal;
        if (category) qry["category"] = { $in: categoryArray };
        if (ring_type) qry["ring_type"] = { $in: ring_type_array };
        if (diamond_shape) qry["diamond_shape"] = { $in: diamond_shape_array };
        if (tag) qry["tag"] = { $in: tag_array };
        if (min && max) {
          qry["mrp"] = {
            $gte: parseInt(min),
            $lte: parseInt(max),
          };
        }
        qry = { is_public: true };
        // console.log("userId: ", userId);
        // console.log("qry ...........", qry);
        let limit1 = parseInt(limit * 0.4);
        let getData1 = await productModel.aggregate([
          { $match: qry },
          // {
          //   $match: {
          //     is_public: true,
          //   },
          // },
          { $match: { is_fav: true } },
          {
            $lookup: {
              from: "reviewproducts",
              foreignField: "product_id",
              localField: "_id",
              as: "avgdata",
            },
          },
          // { $unwind: "$avgdata" },
          // {
          //   $unwind: "$avgdata",
          // },
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
              total_avg: [
                {
                  $group: {
                    _id: "$_id",
                    avgRating: { $avg: "$avgdata.rating" },
                  },
                },
              ],
              result: [
                {
                  $addFields: {
                    avgRating: { $avg: "$avgdata.rating" },
                  },
                },
                {
                  $project: {
                    __v: 0,
                    avgdata: 0,
                  },
                },
                // { $sort: { createdAt: -1 } },
                { $skip: (page - 1) * limit1 },
                { $limit: limit1 },
              ],
            },
          },
        ]);
        getData1 = getData1[0]; //|| { total_count: [0] };
        let data1count = getData1.total_count[0]?.count || 0;
        let limit2 = limit - data1count;
        let getData2 = await productModel.aggregate([
          { $match: qry },
          { $match: { is_fav: false } },
          // {
          //   $unwind: "$avgdata",
          // },
          {
            $lookup: {
              from: "reviewproducts",
              foreignField: "product_id",
              localField: "_id",
              as: "avgdata",
            },
          },
          // { $unwind: "$avgdata" },
          {
            $facet: {
              total_count: [
                {
                  $group: {
                    _id: null,
                    count: { $sum: 1 },
                    // avgRating: { $avg: "$avgdata.rating" },
                  },
                },
              ],
              total_avg: [
                {
                  $group: {
                    _id: "$_id",
                    avgRating: { $avg: "$avgdata.rating" },
                  },
                },
              ],
              result: [
                {
                  $addFields: {
                    avgRating: { $avg: "$avgdata.rating" },
                  },
                },
                {
                  $project: {
                    __v: 0,
                    avgdata: 0,
                  },
                },
                // { $sort: { createdAt: -1 } },
                { $skip: (page - 1) * limit2 },
                { $limit: limit2 },
              ],
            },
          },
        ]);
        getData2 = getData2[0]; //|| { total_count: [0] };
        // console.log("countryData ...........", getData2.total_avg);
        if (getData1.result != "") {
          getData1.result.map(async (item) => {
            if (country) {
              let countryData = await countryModel.findOne({
                currency: country,
              });
              if (countryData) {
                item.real_price = item.real_price * countryData.price;
                item.mrp = item.mrp * countryData.price;
                item.product_variation.map((item1) => {
                  item1.real_price = item1.real_price * countryData.price;
                  item1.mrp = item1.mrp * countryData.price;
                });
              }
            }
            // let avgData1 = await reviewproductModel.aggregate([
            //   {
            //     $match: {
            //       product_id: item._id,
            //     },
            //   },
            //   {
            //     $group: {
            //       _id: null,
            //       avgRating: { $avg: "$rating" },
            //     },
            //   },
            // ]);
            // item.avg = avgData1.avgRating;
          });
        }
        if (getData2.result != "") {
          getData2.result.map(async (item) => {
            if (country) {
              let countryData = await countryModel.findOne({
                currency: country,
              });
              if (countryData) {
                item.real_price = item.real_price * countryData.price;
                item.mrp = item.mrp * countryData.price;
                item.product_variation.map((item1) => {
                  item1.real_price = item1.real_price * countryData.price;
                  item1.mrp = item1.mrp * countryData.price;
                });
              }
            }
            // let avgData2 = await reviewproductModel.aggregate([
            //   {
            //     $match: {
            //       product_id: item._id,
            //     },
            //   },
            //   {
            //     $group: {
            //       _id: null,
            //       avgRating: { $avg: "$rating" },
            //     },
            //   },
            // ]);
            // item.avg = avgData2.avgRating;

            // console.log(avgData2);
          });
        }
        // getData2 = getData2.map((item) => {
        //   return {
        //     ...item,
        //     // item.total_avg._id = item.result._id,
        //   }
        // })
        // console.log("getData2 .......", getData2);
        let getData = [];
        let count =
          getData1.total_count[0]?.count ||
          0 + getData2.total_count[0]?.count ||
          0;
        getData.push(getData1.result);
        getData.push(getData2.result);
        if (getData.length > 0) {
          res({
            status: 200,
            data: { count, getData },
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

  addip: (ip) => {
    return new Promise(async (res, rej) => {
      try {
        // console.log("data ........", data);
        let ipData = await ipModel.find({ ip_address: ip });
        if (ipData != "") {
          // console.log("product find", ipData);
          res({ status: 200, data: ipData });
        } else {
          let newipModel = new ipModel({ ip_address: ip });
          let ipData1 = await newipModel.save();
          if (ipData1) {
            console.log("data save", ipData1);
            res({ status: 200, data: ipData1 });
          }
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

  byId: ({ _id, country }) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await productModel.findById(_id);
        if (getData) {
          // console.log(getData);
          let qry = {};
          let categoryArray;
          if (getData.category)
            categoryArray = getData.category.toString().split(",");
          let ring_type_array;
          if (getData.ring_type)
            ring_type_array = getData.ring_type.toString().split(",");
          let diamond_shape_array;
          if (getData.diamond_shape)
            diamond_shape_array = getData.diamond_shape.toString().split(",");
          let tag_array;
          if (getData.tag) tag_array = getData.tag.toString().split(",");
          if (getData.category) qry["category"] = { $in: categoryArray };
          if (getData.ring_type) qry["ring_type"] = { $in: ring_type_array };
          if (getData.diamond_shape)
            qry["diamond_shape"] = { $in: diamond_shape_array };
          if (getData.tag) qry["tag"] = { $in: tag_array };

          let getData1 = await productModel.aggregate([{ $match: qry }]);
          if (country) {
            let countryData = await countryModel.findOne({ currency: country });
            if (countryData) {
              if (getData != "") {
                getData.real_price = getData.real_price * countryData.price;
                getData.mrp = getData.mrp * countryData.price;
                getData.product_variation.map((item1) => {
                  item1.real_price = item1.real_price * countryData.price;
                  item1.mrp = item1.mrp * countryData.price;
                });
              }
              if (getData1 != "") {
                getData1.map((item) => {
                  item.real_price = item.real_price * countryData.price;
                  item.mrp = item.mrp * countryData.price;
                  item.product_variation.map((item1) => {
                    item1.real_price = item1.real_price * countryData.price;
                    item1.mrp = item1.mrp * countryData.price;
                  });
                });
              }
            }
          }
          if (getData1) {
            res({
              status: 200,
              data: {
                product_data: getData,
                suggestion_product_data: getData1,
              },
            });
          } else {
            res({
              status: 200,
              data: {
                product_data: getData,
                suggestion_product_data: "not Found",
              },
            });
          }
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log(err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  search: ({ str, country }) => {
    return new Promise(async (res, rej) => {
      try {
        let qry = {};
        if (str) {
          qry["$or"] = [
            {
              product_title: { $regex: str, $options: "i" },
            },
            {
              product_description: { $regex: str, $options: "i" },
            },
            {
              metal: { $regex: str, $options: "i" },
            },
            {
              diamond_type: { $regex: str, $options: "i" },
            },
            {
              tag: { $regex: str, $options: "i" },
            },
            {
              category: { $regex: str, $options: "i" },
            },
            {
              ring_type: { $regex: str, $options: "i" },
            },
            {
              diamond_shape: { $regex: str, $options: "i" },
            },
          ];
        }
        let getData = await productModel.aggregate([{ $match: qry }]);
        if (getData) {
          if (country) {
            let countryData = await countryModel.findOne({ currency: country });
            console.log(getData);
            if (countryData) {
              if (getData != "") {
                getData.map((item) => {
                  item.real_price = item.real_price * countryData.price;
                  item.mrp = item.mrp * countryData.price;
                  item.product_variation.map((item1) => {
                    item1.real_price = item1.real_price * countryData.price;
                    item1.mrp = item1.mrp * countryData.price;
                  });
                });
              }
            }
          }
          res({
            status: 200,
            data: {
              result: getData,
            },
          });
        } else {
          rej({ status: 404, message: "No Data Found!!" });
        }
      } catch (err) {
        console.log("err ....", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },
};

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
