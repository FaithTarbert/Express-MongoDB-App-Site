var express = require('express');
var router = express.Router();
const {handlebars} = require('hbs');
var router = express.Router();
const cube = require('../config/database.json');
const Cubes = require('../models/cube');

/* GET details page. */
router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  
  Cubes.find().then((cubes) => {
    res.render('index', {title:"Cubicle", cubes: cubes});
  });
});

module.exports = router;
