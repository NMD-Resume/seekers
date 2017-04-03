const User = require('./authModel');
const Seek = require('../../user/SeekModel');
const cookieController = require('./../util/cookieController');
const sessionController = require('./../session/sessionController');
const bcrypt = require('bcryptjs');
const authController = {};

/**
* createUser - create a new User model and then save the user to the database.
* Will also add a blank resume for that user
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
authController.createUser = (req, res, next) => {
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
        portfolio: [{}],
        skills: [''],
        experience: [{}],
        education: [{}]
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
  User.findOne({username: req.body.username}, function(err, user) {
       if (err) console.log(err);
       if (user && bcrypt.compareSync(req.body.password, user.password)) {
         sessionController.startSession(user);
         res.redirect('/user/' + req.body.username);
       } else {
         //Sends the string 'Error' if the credentials do not match
         res.send('Error');
       }
   });
};

module.exports = authController;
