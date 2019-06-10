const express = require('express');
const router = express.Router();
const Recipes = require('../models/recipes');
const User = require('../models/user')

router.get('/', async (req, res) => {
    try {
        const allRecipes = await Recipes.find();

        res.json({
            status: 200,
            data: allRecipes
        })
    } catch(err){
        console.log(err);
        res.send(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const newRecipe = await Recipes.create();
        res.json({
            status: 200,
            data: newRecipe
        })
    } catch(err) {
        console.log(err);
        res.send(err)
    }
})

router.put('/', async (req, res) => {
    console.log(req.body)
    try {
        // const foundRecipe = await Recipes.findById(req.params.id);
        const foundUser = await User.findById(req.body.userId)
        delete req.body.userId
        foundUser.recipes.push(req.body)
        foundUser.save();
        console.log(foundUser)
        // console.log(foundRecipe)

        res.json({
            status: 200,
            data: foundUser
        })
    } catch(err) {
        console.log(err);
        res.send(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedRecipe = await Recipes.findByIdAndDelete(req.params.id);
        res.json({
            status: 200,
            data: deletedRecipe
        })
    } catch(err) {
        console.log(err);
        res.send(err)    }
})



module.exports = router;
