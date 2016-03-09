'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var Order = mongoose.model('Order');

module.exports = function (app) {

    var googleConfig = app.getValue('env').GOOGLE;

    var googleCredentials = {
        clientID: googleConfig.clientID,
        clientSecret: googleConfig.clientSecret,
        callbackURL: googleConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {

        UserModel.findOne({ 'google.id': profile.id }).exec()
            .then(function (user) {
                if (user) {
                    return user;
                } else {
                    return UserModel.create({
                        email: profile.emails[0].value,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        google: {
                            id: profile.id,
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            token: accessToken
                        }
                    });
                }

            }).then(function (userToLogin) {
                done(null, userToLogin);
            }, function (err) {
                console.error('Error creating user from Google authentication', err);
                done(err);
            });

    };

     //merges cart for login
    function cartMergeLogin (req, user){
      var orderToAdd;
      var currentUser;
      return Order.findOne({sessionId: req.session.id})
        .then(order => {
          orderToAdd = order;
          return UserModel.findById(user._id)
        })
        .then(userToEdit => {
            currentUser = userToEdit;
            return Order.findOne({user: userToEdit._id, status: 'pending'})
        })
        .then(currentOrder => {
          if(!orderToAdd) return; //handle when theres nothing to add to cart
          if(currentOrder){
            var productsToAdd = orderToAdd.products;
              productsToAdd.forEach((product) => {
                var idx =  -1;
                currentOrder.products.forEach((prod, i) => {
                  if (prod.product.toString() === product.product.toString()) idx = i;
                })
                if(idx > -1) currentOrder.products[idx].quantity += product.quantity;
                else currentOrder.products.push(product);
              })
              return Promise.all([currentOrder.save(), orderToAdd.remove()])
          }
          else{
            orderToAdd.sessionId = null;
            orderToAdd.user = currentUser;
            return orderToAdd.save();
          }
        })
        .then(() => {
          return currentUser;
        })
    }

    passport.use(new GoogleStrategy(googleCredentials, verifyCallback));

    app.get('/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            cartMergeLogin(req, req.user)
            .then(function(currentUser){
                res.redirect('/');
            })
        });

};
