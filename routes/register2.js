var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
const { check, validationResult} = require('express-validator');
//res.send(json-response-object)


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('registerPage', { title: 'Welcome to Cubicle\nPlease Register', user: req.user });

});

//passport auth post request
let authCheck = 
router.post('/',
    //this is the validator check upon form post request, prior to passport auth
    [check('username', 'Please Enter A User Name With 5 Or More Characters').isLength({ min: 5}),
    check('password', 'Please Enter A Password With 8 Or More Characters').isLength({ min: 8})], 
    function(req, res) {
    //this is the validator error check
    const errors = validationResult(req);
    //if any errors, return errors
    if(!errors.isEmpty()){
        //use postman route http://localhost:3005/users header set as content-type application/json, body as raw, empty json object to test
        return res.status(400).json({ errors: errors.array() });
    }
    //if no errors continue to user registration and auth with passport
    console.log("register form is working", req.body.username, req.body.password, req.body.repeatPassword);
    let user = req.body.username;
    let pw = req.body.password;
    let pwconfirm = req.body.repeatPassword;
    if(pw != pwconfirm){
        res.send("Passwords Don't Match! Please ReType Your Passwords!");
    }else{
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
    }
    
});

//previously working request adds user to mongo without passport auth
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