const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const authController = require('./auth/user/authController');
const cookieController = require('./auth/util/cookieController');
const sessionController = require('./auth/session/sessionController');


const userController = require('./UserController');

const PORT = 3000;

mongoose.connect('mongodb://nmd:resume@ds113580.mlab.com:13580/nmd_resume');
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/..'));

app.get('/', cookieController.setCookie, (req, res) => {
  res.redirect('/resume');
})

/**
* signup
*/
app.get('/signup', (req, res) => {
  res.redirect('/signup');
})

app.post('/signup', userController.createUser);


/**
* login
*/
app.post('/login', cookieController.setSSIDCookie, userController.verifyUser);


/**
* Authorized routes
*/
app.get('/resume', sessionController.isLoggedIn, (req, res) => {
  userController.getAllUsers((err, users) => {
    if (err) throw err;
    res.render('/resume', { users: users });
  });
});

app.get('/:username', userController.getUser);

app.patch('/:username', userController.updateUser);

app.delete('/:username', userController.deleteUser);



app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
