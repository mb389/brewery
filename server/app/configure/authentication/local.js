'use strict';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');

module.exports = function (app) {

    // When passport.authenticate('local') is used, this function will receive
    // the email and password to run the actual authentication logic.
    var strategyFn = function (email, password, done) {
        User.findOne({ email: email })
            .then(function (user) {
                // user.correctPassword is a method from the User schema.
                if (!user || !user.correctPassword(password)) {
                    done(null, false);
                } else {
                    // Properly authenticated.
                    done(null, user);
                }
            }, function (err) {
                done(err);
            });
    };

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, strategyFn));

    //A POST /signup route to handle new users
    app.post('/signup', function (req, res, next) {
      //need to send a obj with email password
      var userToUpdate;
      User.create(req.body)
      .then(user => {
        userToUpdate = user;
        return Order.findOne({sessionId: req.session.id})
      })
      .then(order => {
        //if order associated with session id, add user to order and order to user
        if(order) {
          order.user = userToUpdate._id;
          userToUpdate.orders.push(order);
        }
      })
      .then(() => {
        req.login(userToUpdate, function(){
          res.status(201).json(userToUpdate);
        })
      })
      .then(null, next);
    });

    // A POST /login route is created to handle login.
    app.post('/login', function (req, res, next) {

        var authCb = function (err, user) {

            if (err) return next(err);

            if (!user) {
                var error = new Error('Invalid login credentials.');
                error.status = 401;
                return next(error);
            }
            var orderToAdd;
            Order.findOne({sessionId: req.session.id})
              .then(order => {
                orderToAdd = order;
                return User.findById(user._id).populate('orders');
              })
              .then(user => {
                  var pendingOrder = user.orders.filter( function (ord){
                    return ord.status === 'pending';
                  })
                  if(pendingOrder) _.merge(pendingOrder, orderToAdd); //will these keep all products?
                  else user.orders.push(orderToAdd)
                  return user
                })
              .then(function (updatedUser){
                  // req.login will establish our session
                  req.login(updatedUser, function (loginErr) {
                    if (loginErr) return next(loginErr);
                    // We respond with a response object that has user with _id and email.
                    res.status(200).send({
                        user: updatedUser.sanitize()
                    });
                });
              })
          }
        //passport is called with the auth callback defined above
        passport.authenticate('local', authCb)(req, res, next);

    });

};
