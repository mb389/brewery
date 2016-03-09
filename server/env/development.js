

module.exports = {
  "DATABASE_URI": 'mongodb://localhost:27017/brewery',
  "SESSION_SECRET": 'Three is better than four',
  "TWITTER": {
    "consumerKey": process.env.TWTR_KEY,
    "consumerSecret": process.env.TWTR_SECRET,
    "callbackUrl": process.env.TWTR_URL
  },
  "FACEBOOK": {
    "clientID": process.env.FB_KEY,
    "clientSecret": process.env.FB_SECRET,
    "callbackURL": process.env.FB_URL
  },
  "GOOGLE": {
    "clientID": process.env.GOOG_KEY,
    "clientSecret": process.env.GOOG_SECRET,
    "callbackURL": process.env.GOOG_URL
  },
  "MAILGUN": {
      "api_key": process.env.MAILGUN_KEY,
      "domain": process.env.MAILGUN_DOMAIN
  }
};
