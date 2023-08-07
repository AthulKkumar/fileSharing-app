const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect(process.env.MONGO_CONNECTION_URL)
    .then(() => {
      console.log(`Db connected sucessfully`);
    })
    .catch((err) => {
      console.log(`Db error : ${err}`);
    });
}

module.exports = connectDb;
