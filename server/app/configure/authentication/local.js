'use strict';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Promise = require('bluebird');
var _ = require('lodash');

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
                    console.log('proper auth', user);
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
        console.log('gets to login route');
        var authCb = function (err, user) {

            if (err) return next(err);

            if (!user) {
                var error = new Error('Invalid login credentials.');
                error.status = 401;
                return next(error);
            }
            var orderToAdd;
            var currentUser;
            Order.findOne({sessionId: req.session.id})
              .then(order => {
                console.log('found order', order);
                orderToAdd = order;
                return User.findById(user._id)
              })
              .then(userToEdit => {
                  console.log('found userToEdit', userToEdit);
                  currentUser = userToEdit;
                  return Order.findOne({user: userToEdit._id, status: 'pending'})
              })
              .then(currentOrder => {
                //REFACTOR THIS LATER
                if(currentOrder.products.length){
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
              .then(function (){
                  console.log('gets to bottom', currentUser);
                  // req.login will establish our session
                  req.login(currentUser, function (loginErr) {
                    if (loginErr) return next(loginErr);
                    // We respond with a response object that has user with _id and email.
                    res.status(200).send({
                        user: currentUser.sanitize()
                    });
                });
              })
          }
        //passport is called with the auth callback defined above
        passport.authenticate('local', authCb)(req, res, next);

    });

};
