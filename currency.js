const { currencyConverter } = require("./helper/currencyConverter");
const countryService = require("./service/admin/country");
const countryModel = require("./model/country.model");
const cron = require("node-cron");
const { symbol } = require("joi");

module.exports = () => {
  try {
    console.log("cron working");

    cron.schedule("0 0 0 * * *", async () => {
      let getData = await countryModel.find();
      // let newData = {
      //   countryData: [],
      // };
      if (getData) {
        getData.map(async (item, index) => {
          let price = await currencyConverter(item.currency);
          let body = {
            countryData: [],
          };
          // body.name = item.name;
          // body.currency = item.currency;
          // body.price = price;
          // body.symbol = item.symbol;
          // body.image = item.image;
          getData[index].price = price;
          // await newData.countryData.push(body);
          // console.log("in.......................", newData);
          // console.log(newData);

          if (index == getData.length - 1) {
            // console.log("getData..............", getData);
            body.countryData = getData;
            let resp = await countryService.addcountry(body);
            if (resp) {
              console.log(resp);
            } else {
              console.log("data not updated!!");
            }
          }
        });
      } else {
        console.log("cron working");
      }
    });
  } catch (err) {
    console.log("error", err);
    return err;
  }
};
