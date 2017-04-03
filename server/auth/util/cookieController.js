const User = require('./../user/authModel');
const sessionController = require('./../session/sessionController');

const cookieController = {};
// cookieController.setCookie = setCookie;
cookieController.setSSIDCookie = setSSIDCookie;

/**
* setCookie - set a cookie with a random number
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
* @param next - Callback with signature ([err])
*/
// function setCookie(req, res, callback) {
//   const ran = Math.random() * (99 - 0) + 0;
//   res.cookie('codesmith', 'hi').cookie('secret', ran).send('random number');
// }

/**
* setSSIDCookie - store the supplied id in a cookie
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
* @param next - Callback with signature ([err])
*/
function setSSIDCookie(req, res, next) {
  User.findOne({username: req.body.username}, (err, result) => {
    if (result) {
      res.cookie('ssid', result._id, {httpOnly: true});
      // sessionController.startSession(req, res, result, next);
    }
    next();
  });
}

module.exports = cookieController;
