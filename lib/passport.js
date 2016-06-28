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
	    clientID : "1341428759207050",
	    clientSecret : "ee698f5b0732b8d0289ea52d36c70bdc",
	    callbackURL : "http://localhost:3000/auth/facebook/callback",
	    profileFields : ['id','name','picture.type(large)', 'emails', 'displayName', 'about', 'gender']
	  },
	  function(accessToken, refreshToken, profile, done) {
	  	User.findOne({facebook_id:profile.id}).then(function(user){
	  		console.log("I am here ....................");
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

