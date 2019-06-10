const mongoose = require('mongoose');
const Recipes = require('./recipes');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    recipes:  [Object]
})


module.exports = mongoose.model('User', UserSchema);