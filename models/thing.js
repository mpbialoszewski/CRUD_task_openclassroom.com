//Creating new Mongoose connection
const mongoose = require('mongoose')

//Setting up schema for thing 
const thingSchema = mongoose.Schema ({
    title: { type: String, required : true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    userId: {type: String, required: true},
    price: {type: Number, required: true},

});

module.exports = mongoose.model('Thing', thingSchema);