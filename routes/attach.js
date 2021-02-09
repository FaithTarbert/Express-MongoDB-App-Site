var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');

//THIS IS FOR ADDING ACCESSORIES TO A SPECIFIC CUBE - NOT ADDING A GENERAL ACCESSORY OPTION (SEE CREATE ACCESSORY FOR THAT)

//GET the create accessory page for a specific cube by id
router.get('/:id', function(req, res, next) {
  // if(err) console.log(err);
  let id = req.params.id;
  //find the cube and any accessories currently attached
  Cube.findOne({_id: id}).populate('accessories')  
  .then((aCube) => {
      console.log('The cube with accessories is ', aCube);
      // console.log('The accessories attached are ', aCube.accessories);

      //need mdb id's of already attached accessories for comparison
      let cubeIds = aCube.accessories.map(x => {return x._id;});
      console.log("The cube IDs are ", cubeIds);
      //find all accessories, filter out the ones already attached (from above) to populate drop down of attach a new accessory page for a specific cube
      Accessory.find()
      .then((results) => {
        console.log("All accessories found are ", results);
        let menuAccessories = results.filter(acc => !cubeIds.includes(acc._id));
        console.log("The filtered accessories are ", menuAccessories);
        res.render('attachAccessory', { title: 'Attach Accessory', cube: aCube, menuAccessories: menuAccessories, user : req.user});
      });
  });
});

//POST the form request to attach a new accessory to a specific cube by id, using the drop down menu populated from the GET request above
//must update both cube and accessory arrays, held in the associated model factory
router.post('/:id', function(req, res, next) {
  console.log('The new requested attachment is ', req.body.accessory);
  let requestedAcc = req.body.accessory;
  let cubeID = req.params.id;
  //update the cube to associate the accessory selected in the form
  Cube.findOneAndUpdate(
    {_id: cubeID},
    //this pushes this new accessory into the array held in the Cube model
    { $push: {"accessories": requestedAcc}},
    //upsert true means if it doesn't exist create it (false is the default value)
    { upsert: true }, 
    function(err) {if (err) console.log(err);}
);
  //update the accessory with it's associated cube
  Accessory.findOneAndUpdate(
      {_id: requestedAcc}, 
      { $push: {"cubes": cubeID}}, 
      { upsert: true }, 
      function(err) {if (err) console.log(err);
  });

  res.redirect(`/details/${cubeID}`);
});

module.exports = router;
