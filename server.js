const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const PORT = process.env.PORT || 3000;

const app = express();

const  OAuth = require('oauth');
const KLOUT_API_KEY = 'kypu6egrv58jj3nqrgdaqzpr';
const TWITTER_API_KEY = 'xdYO8VBEkBcUGMCJZHYRIyXmi';
const TWITTER_API_SECRET = '84kGGaVYE4LKU4TgkNLVd7KjBGGSvUnaadYfbeS4hIMXIsC4PO';

const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
  '1.0A',
  null,
  'HMAC-SHA1'
);

app.use(express.static(path.join(__dirname, 'public')));

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

app.post('/api/tweet', (req, res) => {
  oauth.post(
    `https://api.twitter.com/1.1/statuses/update.json`,
    req.body.accessToken, //test user token
    req.body.secret, //test user secret
    { status: req.body.status }, // data
    (e, data, response) => {
      if (e) console.error(e);
      res.json(data);
    });  
});

app.post('/api/user', (req, res) => {
  oauth.get(
    `https://api.twitter.com/1.1/users/lookup.json?user_id=${req.body.uid}`,
    req.body.accessToken, //test user token 
    req.body.secret, //test user secret             
    function (e, data, response){
      if (e) console.error(e);     
      res.json(data);
    });    
});

app.post('/api/klout', (req, res) => {
  const { screenName } = req.body;
  axios.get(`http://api.klout.com/v2/identity.json/twitter/?key=${KLOUT_API_KEY}&screenName=${screenName}`)
    .then((resp) => {
      const { id } = resp.data;
      axios.get(`http://api.klout.com/v2/user.json/${id}/score?key=${KLOUT_API_KEY}`)
        .then((resp) => {
          res.json(resp.data);
        });
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(path.join(__dirname, 'public', 'index.html')));
});

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});