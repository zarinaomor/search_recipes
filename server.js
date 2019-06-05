const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT || 9000;

console.log(process.env.MY_SECRET);


require('./db/db');


app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOption));

app.use(cors());

const recipeController = require('./controllers/recipeController');
const authController = require('./controllers/authController.js');
const userController = require('./controllers/userController.js');

// app.use('/api/v1/recipes', recipeController);
app.use('/auth', authController);
app.use('/user', userController);

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

app.listen(process.env.PORT || 9000, () => {
    console.log('listening on port 9000')
});

