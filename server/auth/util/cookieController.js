const User = require('./../user/authModel');
const sessionController = require('./../session/sessionController');

const cookieController = {};
cookieController.setSSIDCookie = setSSIDCookie;

/**
* setSSIDCookie - store the id in a cookie
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
* @param next - Callback with signature ([err])
*/
function setSSIDCookie(req, res, next) {
  User.findOne({username: req.body.username}, (err, result) => {
    if (result) {
      res.cookie('ssid', result._id, {httpOnly: true});
    }
    next();
  });
}

module.exports = cookieController;
