const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();

const request = require('request');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');

const oauth = OAuth({
  consumer: {
    // consumer key for byu-twitter-analytics
    key: 'xdYO8VBEkBcUGMCJZHYRIyXmi',
    // consumer seceret for byu-twitter-analytics 
    secret: '84kGGaVYE4LKU4TgkNLVd7KjBGGSvUnaadYfbeS4hIMXIsC4PO' 
  },
  signature_method: 'HMAC-SHA1',
  hash_function: function (base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  }
});

app.use(express.static(path.join(__dirname, '..', 'public')));

// Parsers for POST data
app.use(bodyParser.json());

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

app.get('*', (req, res) => {
  res.sendFile(path.join(path.join(__dirname, '..', 'public', 'index.html')));
});

app.post('/api', (req, res) => {
  const request_data = {
    url: 'https://api.twitter.com/1.1/statuses/update.json',
    method: 'POST',
    data: {
      status: req.body.status
    }
  };
  const token = {
    key: req.body.accessToken,
    secret: req.body.secret
  };
  request({
    url: request_data.url,
    method: request_data.method,
    form: oauth.authorize(request_data, token)
  }, (error, response, body) => {
    //process your data here
    res.json(body);
  });
});

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});