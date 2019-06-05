const mongoose = require('mongoose');


const recipeSchema = new mongoose.Schema({
    title: String,
    publisher: String,
    recipe_id: Number,
    image_url: String
})


module.exports = mongoose.model('Recipe', recipeSchema);