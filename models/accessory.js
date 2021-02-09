
//create the mongoose schema model for use by the rest of our application (step 1)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cube = require('./cube');

const accessorySchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    imageUrl: String,
    cubes: [{ type: Schema.Types.ObjectId, ref: 'Cube'}]
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;