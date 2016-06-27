var models = require( 'models' );
var User = models.User;
var passport = require('passport');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser( function(id, done){
  User.findById(id).asCallback( done );
});