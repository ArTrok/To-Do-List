"use strict";
exports.__esModule = true;
exports["default"] = (function (err, _req, res, _next) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
});
