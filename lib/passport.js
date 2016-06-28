var models = require( '../models' );
var User = models.User;
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var FacebookConfig = require("../config/keys/facebook");
module.exports = function(passport){

	passport.serializeUser((user, done) => {
	  done(null, user.id);
	});

	passport.deserializeUser( function(id, done){
	  User.findById(id).asCallback( done );
	});


	passport.use(new FacebookStrategy({
	    clientID : FacebookConfig.facebookAuth.clientID,
	    clientSecret : FacebookConfig.facebookAuth.clientSecret,
	    callbackURL : FacebookConfig.facebookAuth.callbackURL,
	    profileFields : FacebookConfig.facebookAuth.profileFields
	  },
	  function(accessToken, refreshToken, profile, done) {
	  	User.findOne({facebook_id:profile.id}).then(function(user){
	  		if(user){
	  			return done(null, user)
	  		}
	  		User.build({facebook_id:profile.id,
	  					gender:profile.gender,
	  					display_name:profile.displayName,
	  					role: 'user',
	  					profile_image:profile.photos[0].value,

	  		}).save()
	  		.then(function(user){
	  			console.log("No I  am here")
	  			return done(null,user);
	  		}).catch(function(err){
	  			return done(err);
	  		})
	  	})
	}));
}

