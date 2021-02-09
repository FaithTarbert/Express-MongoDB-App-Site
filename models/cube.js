
//create the mongoose schema model for use by the rest of our application (step 1)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cubeSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId, <---this is automatically added by mongo, so we aren't generating an id, it will break your code (pdf uses it but outdated)
    name: String,
    description: String,
    imageUrl: String,
    difficulty: { type: String, required: true },
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory'}],
    //creator: [{ type: Schema.Types.ObjectId, ref: 'User'}]
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;