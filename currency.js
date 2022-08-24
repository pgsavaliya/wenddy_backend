const { currencyConverter } = require("./helper/currencyConverter");

async function currency(price) {
  let convetedCurrency = await currencyConverter("USD", "INR", price);
  console.log(convetedCurrency);
}

currency(1);
