const Seek = require('./SeekModel');
const Hunt = require('./HuntModel');
const mongoose = require('mongoose');

const UserController = {

  // Get a user from the database and send it in the response
  // Their type will be in the requeset parameter 'type'
  // Their username will be in the request parameter 'username'
  // This should send the found user
  getUser(req, res, next) {
    let User;
    // getting type from route, /:type/:username
    if (req.params.type.toLowerCase() === 'seek') {
      User = Seek;
    } else if (req.params.type.toLowerCase() === 'hunt') {
      User = Hunt;
    } else {
      // if type isn't seek or hunt, will move on to default 404 handler
      return next();
    }

    User.findOne({ username: req.params.username }, (err, user) => {
      if (err) throw err;
      if (user === null) {
        res.status(418).json(err);
      } else {
        res.json(user);
      }
    })
  },

  // Get a user from the database and update the user
  // The user's type will be in the request parameter 'type'
  // The user's username will be in the request parameter 'username'
  // The user's document will be updated with any new information from request body
  updateUser(req, res, next) {
    let User;

    // if no type specified
    if (!req.params.type) return next();

    if (req.params.type.toLowerCase() === 'seek') {
      User = Seek;
    } else if (req.params.type.toLowerCase() === 'hunt') {
      User = Hunt;
    } else {
      return next();
    }

    User.findOneAndUpdate({ username: req.params.username }, req.body, (err, user) => {
      if (err) throw err;
      if (user === null) {
        res.status(418).json(err);
      } else {
        res.json(user);
      }
    });
  },


  // Create a resume based on provided information
  // The user's type will be in the request parameter 'type'
  // The user's username will be in the request parameter 'username'
  createResume(req, res, next) {
    let User;

    // if no type specified
    if (!req.params.type) return next();

    if (req.params.type.toLowerCase() === 'seek') {
      User = Seek;
    } else if (req.params.type.toLowerCase() === 'hunt') {
      User = Hunt;
    } else {
      return next();
    }

    User.create(req.body, (err, user) => {
      if (err) {
        res.status(418).json(err);
      } else {
        res.status(200).json(user);
      }
      return;
    })
  },

  // Delete a user's resume information from the database
  // The user's type will be in the request parameter 'type'
  // The user's username will be in the request parameter 'username'
  deleteUser(req, res) {
    const User = Seek;
    if (req.body.type.toLowerCase() === 'seek') {
      User = Seek;
    } else if (req.body.type.toLowerCase() === 'hunt') {
      User = Hunt;
    }
    User.deleteOne({ username: req.params.username }, (err, user) => {
      if (err) {
        res.status(418).send(err);
      } else {
        res.status(200).send();
      }
    })
  },
};

module.exports = UserController;
