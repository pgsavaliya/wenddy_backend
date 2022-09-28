const nodemailer = require("nodemailer");

exports.mail = async function (email, subject, body) {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "pavansavaliya.itcodehelp@gmail.com", // generated ethereal user
      pass: "pavan@789",
    },
    from: "pavansavaliya.itcodehelp@gmail.com",
  });
  const options = {
    from: "pavansavaliya.itcodehelp@gmail.com", // sender address
    to: email,
    subject: subject,
    html: body,
  };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Pavan....", info.response);
  });
  return "mail Send";
};
