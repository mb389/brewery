

module.exports = {
  "DATABASE_URI": process.env.DATABASE_URI,
  "SESSION_SECRET": process.env.SESSION_SECRET,
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
  }
};
