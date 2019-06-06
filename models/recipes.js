const mongoose = require('mongoose');
const User = require('./user');


const recipeSchema = new mongoose.Schema({
    title: String,
    publisher: String,
    recipe_id: Number,
    image_url: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }]
})


module.exports = mongoose.model('Recipe', recipeSchema);