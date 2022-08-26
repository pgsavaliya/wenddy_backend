const cc = require("currency-converter-lt");

async function currencyConverter(toCountry) {
  const ccInstance = new cc({ from: "USD", to: toCountry });
  return await ccInstance.convert(1);
}
module.exports = { currencyConverter };
