const productModel = require("../../model/product.model");
const addtocartModel = require("../../model/addtocart.model");
const { generateUniqueCode } = require("../../helper/generateUniqueCode");
const mongoose = require("mongoose");

module.exports = {
  add: (data) => {
    return new Promise(async (res, rej) => {
      try {
        // console.log("remainingPeriod.slice(0,10) .........", data.remainingPeriod.toString().slice(0, 10));
        // data['remainingPeriod'] = new Date(`${data.remainingPeriod.toString().slice(0, 10)}` + 'T00:00:00.000+00:00');
        // console.log(data);
        let unique_id = await generateUniqueCode();
        data["percentage_difference"] =
          parseInt((data.real_price * 100) / data.mrp) + "%" || "";
        let newData = data.product_variation.map(
          (item, percentage_difference) => {
            return {
              ...item,
              percentage_difference:
                parseInt((item.real_price * 100) / item.mrp) + "%" || "",
            };
          }
        );
        data["product_variation"] = newData;
        data["uniqueCode"] = unique_id;
        let newProductModel = new productModel(data);
        let saveData = await newProductModel.save();
        if (saveData) {
          // if (data.product_type == "variation") {
          //   for (const element of data.metal_v) {
          //     element.product_id = saveData._id;
          //     let newMetalModel = new metalModel(element);
          //     let saveData1 = await newMetalModel.save();
          //     if (!saveData1) {
          //       rej({ status: 404, message: "someting went wrong!!" });
          //     }
          //   }
          // }
          res({ status: 200, data: {} });
        } else {
          rej({ status: 404, message: "someting went wrong!!" });
        }
      } catch (err) {
        console.log("err ........", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  update: async (_id, data) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await productModel.findByIdAndUpdate(_id, data, {
          new: true,
        });
        if (getData) {
          res({ status: 200, data: "" });
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log("err", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  updatestatus: async (_id, data) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await productModel.findByIdAndUpdate(
          _id,
          { is_public: data },
          { new: true }
        );
        if (getData) {
          res({ status: 200, data: "" });
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log("err", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  updateisfav: async (_id, data) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await productModel.findByIdAndUpdate(
          _id,
          { is_fav: data },
          { new: true }
        );
        if (getData) {
          res({ status: 200, data: "" });
        } else {
          rej({ status: 404, message: "Invalid id!!" });
        }
      } catch (err) {
        console.log("err", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  getAll: (page, limit, str, startDate, endDate, status) => {
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
        // console.log(str);
        if (str) {
          qry["$or"] = [{ product_title: { $regex: str, $options: "i" } }];
        }
        // if (status) {
        //     qry["status"] = status;
        // }
        let getData = await productModel.aggregate([
          { $match: qry },
          //   {
          //     $lookup: {
          //       from: "transactions",
          //       localField: "_id",
          //       foreignField: "idOfCompanyProperty",
          //       as: "propertyTransactionData",
          //     },
          //   },
          // { $unwind: "$propertyTransactionData" },
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
        // console.log("getData.total_count[0] ...........", getData.total_count);
        // console.log("getData ...........", getData);
        if (getData.result.length > 0) {
          //   getData.result = getData.result.map((item, index) => {
          //     let uniqueUser = [
          //       ...new Set(
          //         item.toatlInvestedData.map((i) => i.customerId.toString())
          //       ),
          //     ].length;

          //     delete item.toatlInvestedData;
          //     return {
          //       ...item,
          //       uniqueUser,
          //       fundedByUser:
          //         (item.totalInvestedAmountByUser / item.totalAmount) * 100 || 0,
          //       index: getData.total_count[0].count - index,
          //     };
          //   });
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
        console.log("err ....", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  byId: (id) => {
    return new Promise(async (res, rej) => {
      try {
        // let getData = await productModel.find({
        //   admin_id: id
        // });
        // let propertyId = mongoose.Types.ObjectId(getData._id);
        // let existData = await transactionModel.find({
        //   idOfCompanyProperty: mongoose.Types.ObjectId(getData._id),
        // });
        // console.log("existData ......", existData.length);
        // if (existData.length > 0) {
        // console.log(id);
        let Data = await productModel.aggregate([
          { $match: { _id: mongoose.Types.ObjectId(id) } },
          // let trasactionData = await productModel.aggregate([
          //   { $match: { admin_id: id } },
          // {
          //   $group: {
          //     _id: "$admin_id",
          //     total: { $sum: "$totalAmount" },
          //   },
          // },
          // {
          //   $group: {
          //     _id: null,
          //     totalInvestment: { $sum: "$totalInvestment" },
          //     totalInvestors: { $sum: 1 },
          //   },
          // },
        ]);
        // console.log("Data ..........", Data);
        // let funded =
        //   (trasactionData[0].totalInvestment / getData.totalAmount) * 100;
        // console.log("funded ........", funded);
        if (Data) {
          res({
            status: 200,
            data: {
              // totalInvestedAmountByUser: trasactionData[0].totalInvestment || 0,
              // uniqueUser: trasactionData[0].totalInvestors,
              // fundedByUser: funded,
              // balance: balance,
              result: Data,
            },
          });
        } else {
          rej({ status: 404, message: "Data Not Found", error: {} });
        }
        // } else {
        //   res({ status: 200, data: { result: getData } });
        // }
        rej({
          status: 404,
          message: "Property Not Found, Invalid id!!",
          error: {},
        });

        // if (getData) {
        //     res({ status: 200, data: getData });
        // } else {
        //     rej({ status: 404, message: "Invalid id!!" });
        // }
      } catch (err) {
        console.log(err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

  delete: (_id) => {
    return new Promise(async (res, rej) => {
      try {
        let deleteData = await productModel.findByIdAndDelete(_id);
        if (deleteData) {
          let deletecart = await addtocartModel.deleteMany({ product_id: _id });
          if (deletecart) {
            res({ status: 200, data: "Data Deleted!!" });
          } else {
            rej({ status: 404, message: "Cart data not deleted!!" });
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
};

// exportData: (str, startDate, endDate, status) => {
//     return new Promise(async (res, rej) => {
//         try {
//             let qry = {};
//             if (startDate && endDate) {
//                 startDate = new Date(startDate);
//                 endDate = new Date(endDate);
//                 endDate.setDate(endDate.getDate() + 1);
//                 qry["$and"] = [
//                     { "createdAt": { $gt: startDate } },
//                     { "createdAt": { $lt: endDate } },
//                 ];
//             }
//             if (str) {
//                 qry["$or"] = [
//                     { fullName: { $regex: str, $options: "i" } },
//                     { email: { $regex: str, $options: "i" } },
//                     {
//                         $expr: {
//                             $regexMatch: {
//                                 input: { $toString: "$mobile" },
//                                 regex: str,
//                             },
//                         },
//                     },
//                 ];
//             }
//             if (status) {
//                 qry["status"] = status;
//             }
//             var getData = await productModel.aggregate([{ $match: qry }]);
//             if (getData) {
//                 getData = getData.map((item, index) => {
//                     return {
//                         ...item,
//                         index: getData.length - index
//                     }
//                 });
//                 getData = getData.map((item) => {
//                     return {
//                         index: item?.index.toString(),
//                         _id: item?._id.toString(),
//                         name: item?.name,
//                         featureImage: item?.featureImage,
//                         price: item?.price?.toString(),
//                         minimunInvestment: item?.minimunInvestment?.toString(),
//                         averageRentalYield: item?.averageRentalYield?.toString(),
//                         targetIRR: item?.targetIRR?.toString(),
//                         dividentYield: item?.dividentYield?.toString(),
//                         fiveYearExpectedReturn: item?.fiveYearExpectedReturn?.toString(),
//                         funded: item?.funded?.toString(),
//                         remainingPeriod: item?.remainingPeriod?.toString(),
//                         rentAmount: item?.rentAmount?.toString(),
//                         numberOfInvestors: item?.numberOfInvestors?.toString(),
//                         totalInvestmentNeeded: item?.totalInvestmentNeeded?.toString(),
//                         grossYield: item?.grossYield?.toString(),
//                         suggestedHoldingPeriod: item?.suggestedHoldingPeriod?.toString(),
//                         propertyType: item?.propertyType,
//                         area: item?.area?.toString(),
//                         valuationReport: item?.valuationReport,
//                         informationMemorandum: item?.InformationMemorandum,
//                         financialForecasts: item?.financialForecasts,
//                         overview: item?.overview,
//                         whyInvest: item?.whyInvest,
//                         mapLink: item?.mapLink,
//                         propertyManagerName: item?.propertyManagerName,
//                         propertyManagerDetails: item?.propertyManagerDetails,
//                         developer: item?.developer,
//                         developerDetails: item?.developerDetails,
//                         tenantName: item?.tenantName,
//                         tenantLogo: item?.tenantLogo,
//                         tenantOverview: item?.tenantOverview,
//                         leaseStructureDetails: item?.leaseStructureDetails,
//                         leaseStart: item?.leaseStart?.toString(),
//                         leaseLockIn: item?.leaseLockIn?.toString(),
//                         leaseEnd: item?.leaseEnd?.toString(),
//                         leaseCommencement: item?.leaseCommencement,
//                         monthlyRentRupeePerSQFT: item?.monthlyRentRupeePerSQFT?.toString(),
//                         escalation: item?.escalation?.toString(),
//                         securityDeposit: item?.securityDeposit?.toString(),
//                         leaseTerm: item?.leaseTerm,
//                         floorPlanDetails: item?.floorPlanDetails,
//                         gallaryImages: JSON.stringify(item?.gallaryImages),
//                         floorPlan: JSON.stringify(item?.floorPlan),
//                         status: item?.status,
//                         iframeUrl: item?.iframeUrl,
//                         videoUpload: item?.videoUpload,
//                         createdAt: item?.createdAt.toString(),
//                         updatedAt: item?.updatedAt.toString(),
//                     };
//                 });
//                 res({ status: 200, data: getData });
//             } else {
//                 rej({ status: 404, message: "No Data found!!" });
//             }
//         } catch (err) {
//             console.log("err", err);
//             rej({ status: 500, error: err, message: "something went wrong!!" });
//         }
//     });
// }
