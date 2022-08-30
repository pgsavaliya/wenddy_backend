const subscribeModel = require("../../model/subscribe.model");

module.exports = {
  addsubscribe: (data) => {
    return new Promise(async (res, rej) => {
      try {
        let existData = await subscribeModel.find({ email:data.email });
        if (existData.length > 0) {
          res({
            status: 200,
            data: "already subscribed!!",
          });
        } else {
          let newSubscribeModel = new subscribeModel(data);
          let saveData = await newSubscribeModel.save();
          if (saveData) {
            res({ status: 200, data: "Subscribe Successfully!!" });
          } else {
            rej({ status: 404, message: "something went wrong!!" });
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
};
