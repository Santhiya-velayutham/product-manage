const express = require('express');
const APP_SERVER = express();

APP_SERVER.use(express.json());

APP_SERVER.use("/api",require("./Routes/LoginUser"));
APP_SERVER.use("/api",require("./Routes/productRoutes"));


module.exports = APP_SERVER;
