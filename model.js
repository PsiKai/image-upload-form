const mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: 
    {
        data: Buffer,
        contentType: String
    }
})

module.exports = new mongoose.model('Image', imageSchema);