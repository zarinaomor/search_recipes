const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Register

router.post('/', async (req, res) => {
    let hashedPassword = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    req.body.password = hashedPassword;

    console.log(req.body, 'hitting create user');
    try {
        const createdUser = await User.create(req.body);
        res.json({
            status: 200,
            message: 'Registration successful',
            data: createdUser
        });

    } catch (err) {
        console.log(err);
        res.send(err)
    }
})

// Log-In

router.post('/login', async (req, res) => {
    try {
        const loggedUser = await User.findOne({username: req.body.username});
        console.log(loggedUser, 'this is loggedUser');

        if(loggedUser) {
            if(bcrypt.compareSync(req.body.password, loggedUser.password) && req.body.username === loggedUser.username) {
                req.session.user = loggedUser;
                req.session.message = '';
                req.session.logged = true;

                const { _id, name, email } = loggedUser
                const responseLoggedUser = {
                    _id: _id,
                    name: name,
                    email: email,
                }

                res.json({
                    status: 200,
                    message: 'login successful',
                    data: responseLoggedUser
                })
            } else {
                res.json({
                    message: 'The password you entered is incorrect!'
                })
            }
        } else {
            res.json({
                status: 200,
                message: 'That User does not exist! '
            })
        }

    }catch(err){
        console.log(err);
        res.json({
            status: 200,
            message: 'Could not connect to database'
        })
    }
})

router.get('/logout', (req, res) => {
    console.log('User successfully logged out');

    req.session.destroy((err) => {
        if(err) 
        return('error', err);
        console.log('successful');
        res.json({
            message: 'User successfully logged out'
        })
    })
})

module.exports = router