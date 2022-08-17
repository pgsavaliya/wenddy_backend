exports.response = (msg, data, code, res) => {
  let obj = {};
  obj["message"] = msg;
  obj["data"] = data;
  return res.status(code).json(obj);
};
