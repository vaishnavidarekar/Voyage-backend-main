const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected..!!"))
  .catch((error) => {
    console.log(error.message);
  });
