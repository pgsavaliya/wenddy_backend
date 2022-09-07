const productModel=require("../model/product.model");

exports.generateUniqueCode = () => {
    return new Promise(async (res, rej) => {
        // function genrate() {
        //     const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        //     return str;
        // }
        let uniqueCode = await Math.floor(Math.random() * 900000) + 100000;
        do {
            uniqueCode = await Math.floor(Math.random() * 900000) + 100000;
        } while (
            await productModel.findOne({
                uniqueCode: uniqueCode,
            })
        );
        res(uniqueCode);
    });
};
