const productModel = require("../../model/product.model");
// const transactionModel = require("../../model/transaction.model");
const mongoose = require("mongoose");

module.exports = {
    add: (data) => {
        return new Promise(async (res, rej) => {
            try {
                // console.log("remainingPeriod.slice(0,10) .........", data.remainingPeriod.toString().slice(0, 10));
                // data['remainingPeriod'] = new Date(`${data.remainingPeriod.toString().slice(0, 10)}` + 'T00:00:00.000+00:00');
                let newProductModel = new productModel(data);
                let saveData = await newProductModel.save();
                if (saveData) {
                    res({ status: 200, data: {} });
                }
                else {
                    rej({ status: 404, message: "someting went wrong!!" });
                }
            }
            catch (err) {
                console.log("err ........", err);
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        })
    },

    update: async (_id, data) => {
        return new Promise(async (res, rej) => {
            try {
                let getData = await productModel.findByIdAndUpdate(_id, data, { new: true });
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
                        { "createdAt": { $gt: startDate } },
                        { "createdAt": { $lt: endDate } },
                    ];
                }
                if (str) {
                    qry["$or"] = [
                        { name: { $regex: str, $options: 'i' } },
                        { propertyManagerName: { $regex: str, $options: "i" } },
                        { tenantName: { $regex: str, $options: 'i' } },
                    ]
                }
                if (status) {
                    qry["status"] = status;
                }
                let getData = await productModel.aggregate([
                    { $match: qry },
                    {
                        $lookup: {
                            from: "transactions",
                            localField: "_id",
                            foreignField: "idOfCompanyProperty",
                            as: "propertyTransactionData",
                        },
                    },
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
                                        name: 1,
                                        urlName: 1,
                                        featureImage: 1,
                                        minimunInvestment: 1,
                                        totalInvestment: 1,
                                        totalAmount: 1,
                                        averageRentalYield: 1,
                                        targetIRR: 1,
                                        dividentYield: 1,
                                        fiveYearExpectedReturn: 1,
                                        remainingPeriod: 1,
                                        rentAmount: 1,
                                        numberOfInvestors: 1,
                                        totalInvestmentNeeded: 1,
                                        grossYield: 1,
                                        suggestedHoldingPeriod: 1,
                                        propertyType: 1,
                                        area: 1,
                                        report: 1,
                                        overview: 1,
                                        whyInvest: 1,
                                        mapLink: 1,
                                        propertyManagerName: 1,
                                        propertyManagerDetails: 1,
                                        developer: 1,
                                        developerDetails: 1,
                                        tenantName: 1,
                                        tenantLogo: 1,
                                        tenantOverview: 1,
                                        leaseStructureDetails: 1,
                                        leaseStart: 1,
                                        leaseLockIn: 1,
                                        leaseEnd: 1,
                                        leaseCommencement: 1,
                                        monthlyRentRupeePerSQFT: 1,
                                        escalation: 1,
                                        securityDeposit: 1,
                                        leaseTerm: 1,
                                        floorPlanDetails: 1,
                                        gallaryImages: 1,
                                        floorPlan: 1,
                                        status: 1,
                                        location: 1,
                                        locationStr: 1,
                                        documents: 1,
                                        amenities: 1,
                                        propetyMetaInfo: 1,
                                        propertyManagerWebsiteUrl: 1,
                                        propertyManagerAddress: 1,
                                        propertyManagerImage: 1,
                                        projectedReturn: 1,
                                        sharePrice: 1,
                                        iframeUrl: 1,
                                        videoUpload: 1,
                                        createdAt: 1,
                                        updatedAt: 1,
                                        toatlInvestedData: "$propertyTransactionData",
                                        totalInvestedAmountByUser: {
                                            $sum: "$propertyTransactionData.totalAmount",
                                        },
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
                    getData.result = getData.result.map((item, index) => {
                        let uniqueUser = [
                            ...new Set(item.toatlInvestedData.map((i) => i.customerId.toString())),
                        ].length;

                        delete item.toatlInvestedData;
                        return {
                            ...item,
                            uniqueUser,
                            fundedByUser: (item.totalInvestedAmountByUser / item.totalAmount) * 100 || 0,
                            index: getData.total_count[0].count - index,
                        };
                    });
                    res({
                        status: 200,
                        data: {
                            total_count: getData.total_count[0].count,
                            result: getData.result,
                        },
                    });
                }
                else {
                    rej({ status: 404, message: "No Data Found!!" });
                }
            }
            catch (err) {
                console.log("err ....", err);
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        })
    },

    byId: (_id) => {
        return new Promise(async (res, rej) => {
            try {
                let getData = await productModel.findById(_id);

                let propertyId = mongoose.Types.ObjectId(getData._id);
                let existData = await transactionModel.find({
                    idOfCompanyProperty: mongoose.Types.ObjectId(getData._id),
                });
                console.log("existData ......", existData.length);
                if (existData.length > 0) {
                    let trasactionData = await transactionModel.aggregate([
                        { $match: { idOfCompanyProperty: propertyId } },
                        {
                            $group: {
                                _id: "$customerId",
                                totalInvestment: { $sum: "$totalAmount" },
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                totalInvestment: { $sum: "$totalInvestment" },
                                totalInvestors: { $sum: 1 },
                            },
                        },
                    ]);
                    console.log("trasactionData ..........", trasactionData);
                    let funded =
                        (trasactionData[0].totalInvestment / getData.totalAmount) * 100;
                    console.log("funded ........", funded);
                    if (getData) {
                        res({
                            status: 200,
                            data: {
                                totalInvestedAmountByUser: trasactionData[0].totalInvestment || 0,
                                uniqueUser: trasactionData[0].totalInvestors,
                                fundedByUser: funded,
                                // balance: balance,
                                result: getData,
                            },
                        });
                    } else {
                        rej({ status: 404, message: "Property Not Found", error: {} });
                    }
                } else {
                    res({ status: 200, data: { result: getData } });
                }
                rej({ status: 404, message: "Property Not Found, Invalid id!!", error: {} });

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
                    res({ status: 200, data: "Data Deleted!!" });
                } else {
                    rej({ status: 500, message: "Invalid id!!" });
                }
            } catch (err) {
                console.log(err);
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        });
    },

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

}