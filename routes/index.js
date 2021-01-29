var express = require('express');
var router = express.Router();
const {handlebars} = require('hbs');
var router = express.Router();
const cube = require('../config/database.json');
const Cubes = require('../models/cube');

/* GET home page. */
router.get('/', function(req, res, next) {
  Cubes.find().then((cubes) => {
    res.render('index', {title:"Cubicle", cubes: cubes});
  });
});

module.exports = router;
