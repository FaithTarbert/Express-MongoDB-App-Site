var express = require('express');
var router = express.Router();
const Cube = require("../models/cube");
const fs = require('fs');


router.get('/',  async (req, res, next) => {
    // let searchText = req.query.search;
    // console.log(searchText);
        try {
            // use "lean" to get only JSON data (not Mongoose objects), which is much faster
            const foundCube = await Cube.findOne({ name: req.query.search }).lean().exec(); 
            console.log('Found Cube :', foundCube);
            // res.status(200).json(foundCube); THIS RETURNS THE JSON OBJs TO THE BROWSER FOR QUICK TESTING
            res.render('searchCubePage', { title: 'Search Results', cube: foundCube, loggedInUser: req.user });
        } catch(err) {
            res.status(404).json(err);
        }
});


module.exports = router;