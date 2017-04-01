const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const path = require('path');
const authController = require('./auth/user/authController');
const cookieController = require('./auth/util/cookieController');
const sessionController = require('./auth/session/sessionController');
const userController = require('./user/UserController');

const PORT = 3000;

mongoose.connect('mongodb://nmd:resume@ds113580.mlab.com:13580/nmd_resume');
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
})

/**
* signup
*/
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../signup.html'));
})

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../profile.html'));
})

// Create a user in the database
// localhost://3000/
app.post('/signup', authController.createUser, (req, res) => {
  res.sendFile(path.join(__dirname, '../profile.html'));
});

/**
* login
*/
app.post('/login', cookieController.setSSIDCookie, authController.verifyUser);

// app.post('/', userController.createResume);
/**
* Authorized routes
*/
app.get('/resume', sessionController.isLoggedIn, (req, res) => {
  userController.getAllUsers((err, users) => {
    if (err) throw err;
    res.render('/resume', { users: users });
  });
});

// Get a user from the database
// specify seeker or hunter in type (seek or hunt)
// then username of seeker/hunter
// localhost://3000//"username"
app.get('/:type/:username', userController.getUser);

// Create user
app.post('/:type', userController.createResume);

// Change a user's name
// localhost://3000/"type"/"username"
app.patch('/:type/:username', userController.updateUser);

// Delete a user from the database
// localhost://3000/"username"
app.delete('/:username', userController.deleteUser);

//TESTING OUT CUSTOM URL'S
app.get('/user/:username', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../profile.html'));
});

app.use(express.static(path.join(__dirname, '/../')));

// 404 error
app.get('*', (req, res) => res.status(404).sendFile(path.resolve(__dirname + '/../404.html')));


app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
