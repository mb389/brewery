'use strict';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Store = mongoose.model('Store');
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
                    done(null, user);
                }
            }, function (err) {
                done(err);
            });
    };

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, strategyFn));

    //merges cart for login
    function cartMergeLogin (req, user){
      var orderToAdd;
      var currentUser;
      return Order.findOne({sessionId: req.session.id})
        .then(order => {
          orderToAdd = order;
          return User.findById(user._id)
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

    function cartMergeSignup (req){
      var userToUpdate;
     return User.create(req.body)
      .then(user => {
        userToUpdate = user;
        return Order.findOne({sessionId: req.session.id})
      })
      .then(order => {
        //if order associated with session id, add user to order and order to user
        if(order) {
          order.user = userToUpdate._id;
          order.sessionId = null;
          return order.save()
        }
        else return;
      })
      .then(() => {
        //create store
        if(!req.body.store) return [userToUpdate]
        else{
          req.body.store.owner = userToUpdate._id;//add owner to store
          userToUpdate.isOwner = true;
          return Promise.all([userToUpdate.save(), Store.create(req.body.store)])
        }
      })
    }


    //A POST /signup route to handle new users
    app.post('/signup', function (req, res, next) {
      //need to send a obj with email password
      cartMergeSignup(req)
      .then( UserwithStore => {
        req.login(UserwithStore[0], function(){
          res.status(201).json(UserwithStore[0]);
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
            cartMergeLogin(req, user)
              .then((currentUser) => {
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
