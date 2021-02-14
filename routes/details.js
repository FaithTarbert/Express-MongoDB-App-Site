var express = require('express');
var router = express.Router();
const Accessory = require('../models/accessory');
const Cube = require('../models/cube');

// router.get('/update', function(req, res, next) {
//   res.render('updatedDetailsPage', { title: 'Updated Details Page'});
// });

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  // if(err) throw (err);
  let id = req.params.id;
  Cube.findOne({_id: id}).populate('accessories')
    .then((results) => {
      console.log("The single cube results from the details get route is ", results);
      console.log("the accessories results from the details get route is ", results.accessories);
      // let accessories = results.accessories;
      res.render('details', {cube: results, accessories: results.accessories, user : req.user});
    });
});

module.exports = router;