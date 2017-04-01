const Seek = require('./SeekModel');
const Hunt = require('./HuntModel');
const mongoose = require('mongoose');

const UserController = {
  createUser(req, res) {
    let User;
    if (req.body.type.toLowerCase() === 'seek') {
      User = Seek;
    } else if (req.body.type.toLowerCase() === 'hunt') {
      User = Hunt;
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

  // Get a student from the database and send it in the response
  // Their first name will be in the request parameter 'name'
  // This should send the found student
  getUser(req, res) {
    User.findOne({username: req.params.username}, (err, user) => {
      if (err) throw err;
      if (user === null) {
        res.status(418).send(err);
      } else {
        res.status(200).send(user);
      }
    })
  },

  // Get a student from the database and update the student
  // The student's first name will be in the request parameter 'name'
  // The student's new first name will be in the request body
  updateUser(req, res) {
    User.findOneAndUpdate({username: req.params.username}, req.body, (err, user) => {
      if (err) throw err;
      if (user === null) {
        res.status(418).send(err);
      } else {
        res.status(200).send(user);
      }
    });
  },

  // Delete a student from the database
  // The student's first name will be sent in the request parameter 'name'
  // This should send a success status code
  deleteUser(req, res) {
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
