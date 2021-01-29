
//create the mongoose schema model for use by the rest of our application (step 1)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cubeSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    imageUrl: String,
    difficulty: Number
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;