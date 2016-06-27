var path = require('path');

var _ = require('lodash'),
  dbConfigs = require('./database.json'),
  env = process.env.NODE_ENV || 'development',
  envConfig = {},
  defaultConfig = {
    appRoot: path.resolve( __dirname + '/..' ),
    SITE_ROOT: 'http://localhost:3000',
    cookieName: 'xxyyzz.sid',
    cookieSecret: 'F#JKLn&()yHIO$%900nsd',
    // mail:{
    //   email: 'admin@collab.com',
    //   authStr: 'smtps://user%40gmail.com:pass@smtp.gmail.com',
    // },
    env: 'development',
    port: 3000,
  },
  config;

try {
  envConfig = require('./env/' + env );
} catch(e){
  console.log( 'Failed to require config file: ', 'env/'+ env );
  envConfig = {};
}

config = _.defaults( {}, envConfig, defaultConfig );
config.db = dbConfigs[env];
config.env = env;

module.exports = config;

