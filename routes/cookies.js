var express = require('express');
var router = express.Router();

router.get('/cookies/set', function(req, res, next) {
    res.cookie("message", "faith's cookie message")

    res.send("You get the cookies");
})