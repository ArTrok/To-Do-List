"use strict";
exports.__esModule = true;
var express_1 = require("express");
var todolist_1 = require("./todolist");
var router = (0, express_1.Router)();
router.use('/', todolist_1["default"]);
exports["default"] = router;
