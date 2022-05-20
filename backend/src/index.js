"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var PORT = process.env.PORT;
var server = app_1["default"].listen(PORT, function () { return console.log("Server is running on PORT: ".concat(PORT)); });
exports["default"] = server;
