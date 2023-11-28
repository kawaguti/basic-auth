const express = require('express');
const basicAuth = require('express-basic-auth');
const passport = require('passport');
const config = require('./config.json');
const BearerStrategy = require('passport-azure-ad').BearerStrategy;
const app = express();

app.use(basicAuth({
    users: { 'admin': 'supersecret' },
    challenge: true,
    realm: 'lahculru468',
    unauthorizedResponse: getUnauthorizedResponse
}))

const options = {
    identityMetadata: config.credentials.metaData,
    clientID: config.credentials.clientID,
    audience: config.credentials.clientID,
    //policyName: config.policies.policyName,
    //isB2C: config.settings.isB2C,
    //validateIssuer: config.settings.validateIssuer,
    loggingLevel: 'info',
    //passReqToCallback: config.settings.passReqToCallback
}

passport.use(
    new BearerStrategy(options,
        function(token, done) {
          log.info('verifying the user');
          log.info(token, 'was the token retreived');
          findById(token.oid, function(err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              log.info('User is not exist, oid is: ', token.oid);
            }
            owner = token.oid;
            return done(null, user, token);
          });
        }));


function getUnauthorizedResponse(req) {
    return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'No credentials provided'
}

app.get('/api/tasks', 
            passport.authenticate('oauth-bearer', { session:false }), function(){res.send('Hello World!')});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.post('/', function(req, res) {
    passport.authenticate('oauth-bearer', { session:false }, function(){res.send('Hello World through OAuth!')});
});
  
app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});




