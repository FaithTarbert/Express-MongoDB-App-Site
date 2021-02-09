var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
//res.send(json-response-object)


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('registerPage', { title: 'Welcome to Cubicle\nPlease Register', user: req.user });

});

//passport auth post request
router.post('/', function(req, res) {
    console.log("register form is working", req.body.username);
    let user = req.body.username;
    let pw = req.body.password;
    User.register(new User({ username : user }), pw, function(err, user) {
        if (err) {
            return res.render('registerPage', { user : user });
        } else {
            passport.authenticate('local')(req, res, function () {
                req.session.save(function(err) {
                    if (err) {
                        return next(err);
                    }
                    console.log('the User is', user);
                    res.redirect('/');
                });
            });
        }        
    });
});
//previously working request without passport
// router.post('/', function(req, res, next) {
//     console.log("register form is working", req.body.username);
//     let user = req.body.username;
//     let pw = req.body.password;
//     let tempUser = new User ({ user, pw });
//     tempUser.save()
//     .then((request) => {
//         console.log('This is the req', request);
//         res.redirect('/');
//     });
  
// });
module.exports = router;