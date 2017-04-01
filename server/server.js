const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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
app.use(cookieParser());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
})

/**
* signup
*/
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../signup.html'));
})

// Create a user in the database
// localhost://3000/
app.post('/signup', authController.createUser, (req, res) => {
  console.log('this shit should render');
  res.sendFile(path.join(__dirname, '../profile.html'));
});
// app.post('/signup', (req, res) => {
//   console.log('signup');
// })

app.get('/profile', (req, res) => {
  console.log('get profile');
  res.sendFile('/Users/Michael/Desktop/We-Got-This/profile.html');
})


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
// localhost://3000//"username"
// app.get('/:username', userController.getUser);

// Change a user's name
// localhost://3000/"username"
app.patch('/:username', userController.updateUser);

// Delete a user from the database
// localhost://3000/"username"
app.delete('/:username', userController.deleteUser);

// app.get('/styles.css', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../styles.css'));
// })

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../index.html'));
// })

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../index.html'));
// })

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../index.html'));
// })

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../index.html'));
// })

app.use(express.static(path.join(__dirname, '/../')));


app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
