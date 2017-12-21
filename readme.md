# twitter-analytics
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/coloradocolby/twitter-analytics/blob/master/LICENSE)

![demo](https://github.com/coloradocolby/twitter-analytics/blob/master/public/images/demo.gif)

## Demo
https://cc-twitteranalytics.herokuapp.com

## Installation
[node.js](http://nodejs.org/download/) is required to get ``npm``.

If you would like to download the code and try it for yourself:

1. Create a .env-development file and configure it like so
```
      FIREBASE_API_KEY=xxxxx
      FIREBASE_AUTH_DOMAIN=xxxxx
      FIREBASE_DATABASE_URL=xxxxx
      FIREBASE_PROJECT_ID=xxxxx
      FIREBASE_STORAGE_BUCKET=xxxx
      FIREBASE_MESSAGING_SENDER_ID=xxxxx
```
2. Clone the repo: `git@github.com:coloradocolby/twitter-analytics.git`
3. `cd twitter-analytics`
4. Install packages: `yarn`
5. Build project: `yarn run dev-server`
6. Start server: `yarn start`
7. Open your browser at: `http://localhost:8080`

## License
[MIT](https://github.com/coloradocolby/actor-lookup/blob/master/LICENSE)