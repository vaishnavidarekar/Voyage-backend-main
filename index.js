const express = require("express");
require("./configs/mongoose");
require("dotenv").config();
const cors = require("cors");

const userRouter = require("./controller/user");
const packageRouter = require("./controller/package");
const guideRouter = require("./controller/guide");
const blogRouter = require("./controller/blog");
const orderRouter = require("./controller/order");

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(packageRouter);
app.use(guideRouter);
app.use(blogRouter);
app.use(orderRouter);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
