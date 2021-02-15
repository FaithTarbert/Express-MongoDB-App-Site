var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
const { check, body, validationResult} = require('express-validator');
//res.send(json-response-object)


// /* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('registerPage', { title: 'Welcome to Cubicle\nPlease Register', user: req.user });

});

//passport auth post request
router.post('/',
[
    body('username')
        .trim()
        .isLength({min: 5})
        .withMessage('Username Must Be At Least 5 Characters Long'),
    body('password')
        .trim()
        .isLength({min: 8})
        .withMessage('Password Must Be At Least 8 Characters Long'),
    body('repeatPassword')
        .trim()
    .custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('The Password does not match');
        }
        return true;
    })
], async (req, res, next) => {
    try {
        var displayErr;
        const errors = validationResult(req);
        // console.log(errors);
        if(!errors.isEmpty()){
            errors.array().forEach(error => {
                displayErr = error.msg;
                // console.log(displayErr);       
            });
            res.render('registerPage', {errors: errors.array()});
            return;
        } 
        let newUser = new User({ username: req.body.username, password: req.body.password});
        let validateErrs = newUser.validateSync();  
        if(validateErrs == undefined && req.body.password === req.body.repeatPassword){
            User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
            if (err) {
                res.render('registerPage', {err: err});
                // console.log('this is error 1', err);
            } else {
                passport.authenticate('local')(req, res, function () {
                    req.session.save(function(err) {
                        if (err) {
                            // console.log('this is error 2', err);
                            return next(err);
                        }
                        // console.log('the User is', user);
                        res.redirect('/');
                    });
                });
            }        
        });        
    } 
    }catch(err) {
        console.log(err);
    }
});

module.exports = router;