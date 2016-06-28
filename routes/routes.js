var express = require('express');
var router = express.Router();
var passport = require('passport');
var HomeController = require('../controller/home_controller').Home;
var FacebookStrategy = require('passport-facebook').Strategy;

require('../lib/passport')(passport);
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    return res.redirect('/');
}

/* GET home page. */

router.get('/' , HomeController.getDashboard);
router.get('/profile', isLoggedIn, function(req, res) {
        res.send({
            user : req.user // get the user out of session and pass to template
        });
});

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/profile',
                                      failureRedirect: '/' }));

module.exports = router;
