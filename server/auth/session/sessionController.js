const Session = require('./sessionModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*
*/
sessionController.isLoggedIn = (req, res, next) => {
  Session.findOne({cookieId: req.cookies.ssid}, (err, result) => {
    if (result === null) {
      res.redirect('/signup');
    } else {
      next();
    }
  });
};

/**
* startSession - create a new Session model and then save the new session to the
* database.
*
*/
sessionController.startSession = (result) => {
  var session = new Session({cookieId: result._id});
  session.save();

};

module.exports = sessionController;
