const jwt = require("jsonwebtoken");
const { decrypt } = require("../helper/encrypt-decrypt");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config/.env") });

// function verifyUserToken(req, res, next) {
//   let token = req.headers["authorization"];
//   if (!token) {
//     res.status(403).json({ success: false, message: "token missing" });
//   } else {
//     token = token.split(" ")[1];
//     jwt.verify(token, process.env.USER_ACCESS_TOKEN, (err, payload) => {
//       if (err) {
//         res.status(403).json({ success: false, message: "unauthorized token" });
//       } else {
//         req.userId = decrypt(payload.user_id, process.env.USER_ENCRYPTION_KEY);
//         req.password = decrypt(
//           payload.password,
//           process.env.USER_ENCRYPTION_KEY
//         );

//         next();
//       }
//     });
//   }
// }

// function verifyUserEmailToken(token) {
//   return new Promise(async (resolve, reject) => {
//     if (!token) {
//       reject({ message: "token missing", status: 401 });
//     } else {
//       jwt.verify(token, process.env.USER_EMAIL_ACCESS_TOKEN, (err, payload) => {
//         if (err) {
//           reject({ message: "unauthorized token", status: 401 });
//         } else {
//           resolve(payload);
//         }
//       });
//     }
//   });
// }

// function verifyCpToken(req, res, next) {
//   let token = req.headers["authorization"];
//   if (!token) {
//     res.status(403).json({ success: false, message: "token missing" });
//   } else {
//     token = token.split(" ")[1];
//     jwt.verify(token, process.env.CP_ACCESS_TOKEN, (err, payload) => {
//       if (err) {
//         res.status(403).json({ success: false, message: "unauthorized token" });
//       } else {
//         req.cpId = decrypt(payload.cpId, process.env.CP_ENCRYPTION_KEY);
//         req.otp = decrypt(
//           payload.otp,
//           process.env.CP_ENCRYPTION_KEY
//         );
//         next();
//       }
//     });
//   }
// }

// function verifyAdminEmailToken(token) {
//   return new Promise(async (resolve, reject) => {
//     if (!token) {
//       reject({ message: "token missing", status: 401 });
//     } else {
//       jwt.verify(
//         token,
//         process.env.ADMIN_EMAIL_ACCESS_TOKEN,
//         (err, payload) => {
//           if (err) {
//             reject({ message: "unauthorized token", status: 401 });
//           } else {
//             resolve(payload);
//           }
//         }
//       );
//     }
//   });
// }

function verifyAdminToken(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) {
    res.status(403).json({ success: false, message: "token missing" });
  } else {
    token = token.split(" ")[1];
    jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN, (err, payload) => {
      if (err) {
        res.status(403).json({ success: false, message: "unauthorized token" });
      } else {
        req.adminId = decrypt(
          payload.admin_id,
          process.env.ADMIN_ENCRYPTION_KEY
        );
        req.password = decrypt(
          payload.password,
          process.env.ADMIN_ENCRYPTION_KEY
        );
        next();
      }
    });
  }
}

// function verifyOtpToken(token) {
//   return new Promise(async (resolve, reject) => {
//     if (!token) {
//       reject({ message: "Token Missing", status: 401 });
//     } else {
//       jwt.verify(token, process.env.USER_OTP_TOKEN, (err, payload) => {
//         if (err) {
//           reject({ message: "Unauthorized Token", status: 401 });
//         } else {
//           resolve(payload);
//         }
//       });
//     }
//   });
// }

// function verifyToken(req, res, next) {
//   let token = req.headers["authorization"];
//   if (!token) {
//     res
//       .status(403)
//       .json({ success: false, message: "Login to view Page Details!!" });
//   } else {
//     next();
//   }
// }

// function optionalUserToken(req, res, next) {
//   let token = req.headers["authorization"];
//   if (!token) return next();

//   token = token.split(" ")[1];
//   jwt.verify(token, process.env.USER_ACCESS_TOKEN, (err, payload) => {
//     if (err)
//       return res
//         .status(403)
//         .json({ success: false, message: "unauthorized token" });

//     req.userId = decrypt(payload.user_id, process.env.USER_ENCRYPTION_KEY);
//     req.password = decrypt(payload.password, process.env.USER_ENCRYPTION_KEY);
//     next();
//   });
// }

module.exports = {
  //   verifyOtpToken,
  //   verifyUserEmailToken,
  //   verifyCpToken,
  //   verifyAdminEmailToken,
  //   verifyUserToken,
  verifyAdminToken,
  //   verifyToken,
  //   optionalUserToken,
};
