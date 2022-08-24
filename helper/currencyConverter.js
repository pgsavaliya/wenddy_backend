// import cc from "currency-converter-lt";
const cc = require("currency-converter-lt");

async function currencyConverter(fromCountry, toCountry, ammount) {
  const ccInstance = new cc({ from: fromCountry, to: toCountry });
  return await ccInstance.convert(ammount);
}
module.exports = { currencyConverter };
