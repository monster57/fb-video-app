var models = require( '../models' );
var User = models.User;
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
module.exports = function(passport){

	passport.serializeUser((user, done) => {
	  done(null, user.id);
	});

	passport.deserializeUser( function(id, done){
	  User.findById(id).asCallback( done );
	});


	passport.use(new FacebookStrategy({
	    clientID: "1341428759207050",
	    clientSecret: "ee698f5b0732b8d0289ea52d36c70bdc",
	    callbackURL: "http://localhost:3000/auth/facebook/callback",
	    profileFields : ['id','name','picture.type(large)', 'emails', 'displayName', 'about', 'gender']
	  },
	  function(accessToken, refreshToken, profile, done) {
	    console.log(profile ,"---------")
	  }
	));
}

