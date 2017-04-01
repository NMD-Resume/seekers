const User = require('./authModel');
const Seek = require('../../user/SeekModel');
const cookieController = require('./../util/cookieController');
const sessionController = require('./../session/sessionController');
const bcrypt = require('bcryptjs');
const authController = {};

/**
* getAllUsers
*
* @param next - Callback Function w signature (err, users)
*/
authController.getAllUsers = (next) => {
  User.find({}, next);
};

/**
* createUser - create a new User model and then save the user to the database.
* Will also add a blank resume for that user
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
authController.createUser = (req, res, next) => {
  // console.log('this is req.body.username', req.body.username);
  // console.log('this is req.body.password', req.body.password);
  var user = new User({ username: req.body.username, password: req.body.password });

  user.save((err) => {
    if (err) {
      res.redirect('/signup');
    } else {
      // create blank resume
      const blankResume = new Seek({
        username: req.body.username,
        firstName: 'New',
        lastName: 'User',
        type: 'seek',
      });

      blankResume.save((err) => {
        if (err) {
          res.redirect('/signup');
        } else {
          cookieController.setSSIDCookie(req, res, next);
        }
      })
    }
  });
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
authController.verifyUser = (req, res, next) => {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) console.log(err); //throw err;
    console.log('verify user', user);
    console.log('req password', req.body.password);
    //  console.log('bcrypt', bcrypt.compareSync(req.body.password, user.password));
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      console.log('in verify')
      sessionController.startSession(user);
      res.redirect('/profile');
      //  next();
    } else {
      res.send('Error');
    }
  });
};

module.exports = authController;
