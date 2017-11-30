const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const publicPath = path.join(__dirname, '..', 'public');
const PORT = process.env.PORT || 3000;
const app = express();

const oauth = OAuth({
  consumer: {
    key: 'xdYO8VBEkBcUGMCJZHYRIyXmi',
    secret: '84kGGaVYE4LKU4TgkNLVd7KjBGGSvUnaadYfbeS4hIMXIsC4PO'
  },
  signature_method: 'HMAC-SHA1',
  hash_function: function (base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  }
});

// Parsers for POST data
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use(express.static(publicPath));

app.get('/callback', (req, res) => {
  console.log(req);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.post('/api', function (req, res) {
  var request_data = {
    url: 'https://api.twitter.com/1.1/statuses/update.json',
    method: 'POST',
    data: {
      status: req.body.status
    }
  };
  var token = {
    key: req.body.accessToken,
    secret: req.body.secret
  };

  request({
    url: request_data.url,
    method: request_data.method,
    form: oauth.authorize(request_data, token)
}, function(error, response, body) {
    //process your data here
    res.json(body);
});


});

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});

  // var oauth = new OAuth.OAuth(
  //   'https://api.twitter.com/oauth/request_token',
  //   'https://api.twitter.com/oauth/access_token',
  //   'xdYO8VBEkBcUGMCJZHYRIyXmi',
  //   '84kGGaVYE4LKU4TgkNLVd7KjBGGSvUnaadYfbeS4hIMXIsC4PO',
  //   '1.0A',
  //   null,
  //   'HMAC-SHA1'
  // );
  // console.log(oauth);
  // oauth.post(
  //   'https://api.twitter.com/1.1/account/settings.json',
  //   req.body.accessToken, //test user token
  //   req.body.secret, //test user secret            
  //   function (e, data, result) {
  //     if (e) console.error(e);
  //     res.json(data);
  //   });