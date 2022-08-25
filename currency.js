const { currencyConverter } = require("./helper/currencyConverter");
const countryService = require("./service/admin/country");
const countryModel = require("./model/country.model");
const express = require("express");

const mongoose = require("mongoose");

const cron = require("node-cron");
module.exports = () => {
  try {
    cron.schedule("0 0 0 * * *", async () => {
      let getData = await countryModel.find();
      // console.log("dkjfh ......", getData);
      if (getData != "") {
        getData.map(async (item, index) => {
          let price = await currencyConverter(item.currency);
          body = {};
          body.name = item.name;
          body.currency = item.currency;
          body.price = price;
          console.log(body);
          let resp = await countryService.addcountry(body);
          if (resp) {
            console.log(resp);
          } else {
            console.log("data not updated!!");
          }
        });
      } else {
        console.log("cron warking");
      }
    });
  } catch (err) {
    console.log("error", err);
    return err;
  }
};
