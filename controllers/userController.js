const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


// Index route

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find({});

        res.json({
            status: 200,
            data: allUsers
        })
    } catch(err) {
        console.log(err);
        res.send(err)
    }
})

// Show route

router.get('/:id', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id);

        res.json({
            status: 200,
            data: foundUser
        })
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

// Update route

router.put('/:id', async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});

        res.json({
            status: 200,
            data: updateUser
        })
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

// Destroy route

router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        console.log(deletedUser, 'this is deletedUser');

        res.json({
            status: 200,
            message: 'User successfully deleted'
        })
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})


module.exports = router;