var express = require('express');
var router = express.Router();
const {handlebars} = require('hbs');
var router = express.Router();
const Cubes = require('../models/cube');

/* GET home page. */
router.get('/', function(req, res, next) {
  Cubes.find().then((cube) => {
    console.log(cube)
;    res.render('index', {title:"Cubicle", cube: cube, user : req.user});
  });
});

//this logs you out using the nav bar menu via passport (no longer links to logutPage route)
router.get('/logout', function(req, res, next) {
  req.logOut();
  res.redirect('/');
});

module.exports = router;
