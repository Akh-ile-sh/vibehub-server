const mongoose = require("mongoose");

const connectDb = function (url) {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connectDb,
};
