"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
var mysql = require("mysql2/promise");
dotenv.config();
var connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});
exports["default"] = connection;
