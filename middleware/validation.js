const Joi = require("joi");
// const userModel = require("../model/user.model");
const adminModel = require("../model/admin.model");
const { response } = require("./response");

getResult = async (result, res, next) => {
    try {
        if (result.error)
            return response("Validation error!!", false, 422, result.error.details);
        else next();
    } catch (err) {
        return response(
            "something went wrong in validation",
            result.error.details,
            422,
            res
        );
    }
};

exports.userMobileCheck = async (req, res, next) => {
    try {
        let isMobile = await userModel.findOne({ mobile: req.body.mobile });
        if (isMobile) response("Mobile number is already exist!!", {}, 400, res);
        else next();
    }
    catch (err) {
        response("something went wrong!!", err, 500, res);
    }
};

exports.userEmailCheck = async (req, res, next) => {
    try {
        let isEmail = await userModel.findOne({ email: req.body.email });
        if (isEmail) response("Email is already exist!!", {}, 404, res);
        else next();
    }
    catch (err) {
        response("something went wrong!!", err, 500, res);
    }
};

exports.cpMobileCheck = async (req, res, next) => {
    try {
        let isMobile = await cpModel.findOne({ mobile: req.body.mobile });
        if (isMobile) response("The Mobile Number has already been used", {}, 404, res);
        else next();
    }
    catch (err) {
        response("something went wrong!!", err, 500, res);
    }
};

// exports.adminMobileCheck = async (req, res, next) => {
//     try {
//         let isMobile = await adminModel.findOne({ mobile: req.body.mobile });
//         if (isMobile) response("Mobile number is already exist!!", {}, 404, res);
//         else next();
//     }
//     catch (err) {
//         response("something went wrong!!", err, 500, res);
//     }
// };

exports.adminEmailCheck = async (req, res, next) => {
    try {
        let isEmail = await adminModel.findOne({ email: req.body.email });
        if (isEmail) response("Email is already exist!!", {}, 404, res);
        else next();
    }
    catch (err) {
        response("something went wrong!!", err, 500, res);
    }
};

exports.staffMobileCheck = async (req, res, next) => {
    try {
        let isMobile = await staffModel.findOne({ mobile: req.body.mobile });
        if (isMobile) response("Mobile number is already exist!!", {}, 404, res);
        else next();
    }
    catch (err) {
        response("something went wrong!!", err, 500, res);
    }
};

exports.verifyMobile = async (req, res, next) => {
    try {
        if (req.body.type == 'userLogin') {
            let data = await userModel.findOne({ mobile: req.body.mobile });
            if (data) next();
            else response("number is not registered, please check the mobile number you entered", {}, 400, res);
        }
        else if (req.body.type == 'contactUs' || req.body.type == 'userRegistration') {
            next();
        }
        // else if (req.body.type == 'cpLogin') {
        //     let data = await partnerModel.findOne({ mobile: req.body.mobile });
        //     if (data) next();
        //     else response("number is not registered, please check the mobile number you entered", {}, 400, res);
        // }
        else {
            response("Only userLogin, contactUs and userRegistration are alloweded!!", {}, 400, res);
        }
    }
    catch (err) {
        response("something went wrong!!", err, 500, res);
    }
};
