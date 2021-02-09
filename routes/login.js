var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');


/* GET login page*/
router.get('/', function(req, res, next) {
    res.render('loginPage', { title: 'Login Page', user : req.user });
    // res.send('This is working');
});

router.post('/', passport.authenticate('local', {failureRedirect: '/loginPage' }), function(req, res) {
    res.redirect('/');
});

module.exports = router;