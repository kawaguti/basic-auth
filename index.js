const express = require('express');
const basicAuth = require('express-basic-auth');
const app = express();

app.use(basicAuth({
    users: { 'admin': 'supersecret' },
    challenge: true,
    realm: 'lahculru468',
    unauthorizedResponse: getUnauthorizedResponse
}))

function getUnauthorizedResponse(req) {
    return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'No credentials provided'
}

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});




