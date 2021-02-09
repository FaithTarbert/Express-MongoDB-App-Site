var express = require('express');
var router = express.Router();


//NOT USING THIS PAGE NOW AS WE ARE USING THE LOGOUT VIA MENU NAV BAR WITH PASSPORT

/* GET login page*/
router.get('/', function(req, res, next) {
    res.render('logoutPage', { title: 'Logout Page' });
    // res.send('This is working');
});
module.exports = router;