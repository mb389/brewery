

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
    "clientID": '189101154195-ajedf8tmgtiui05g6rjea2o4hu7ikftf.apps.googleusercontent.com',
    "clientSecret": 'QYRkNVqgt9weXZnvCkLwajJW',
    "callbackURL": 'http://127.0.0.1:1337/auth/google/callback'
  }
};
