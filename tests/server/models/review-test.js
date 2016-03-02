var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
var supertest = require('supertest');
// var app = require('../app');
// var agent = supertest.agent(app);
chai.use(spies);
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

// Require in all models.
require('../../../server/db/models');

var Review = mongoose.model('Review');
var Product = mongoose.model('Product');
var User = mongoose.model('User');

describe('Review model', function () {

      beforeEach('Establish DB connection', function (done) {
          if (mongoose.connection.db) return done();
          mongoose.connect(dbURI, done);
      });

      afterEach('Clear test database', function (done) {
          clearDB(done);
      });

      describe('Validation', function () {

        var review;
        beforeEach(function(){
          review = new Review;
        });

      it('should exist', function () {
          expect(Review).to.be.a('function');
      });

      it('should have stars', function() {
        review.validate(function(err){
            expect(err.errors.stars).to.be.a('number');
            done();
         })
      })

      it('should have content', function() {
        review.validate(function(err){
            expect(err.errors.content).to.be.a('string');
            done();
         })
       });
    });
});

    describe('Review info',function(){

      beforeEach(function(done){
        var userPromise=User.create({
          email: "newuser@gmail.com",
          password: "password123"
        });

        var productPromise=Product.create({
          "name": "Lansoprazole",
          "description": "Dis mineral metabol NEC",
          "quantity": 20,
          "categories": "IPA",
          "price": 23.6,
          "photo": "http://dummyimage.com/242x118.gif/dddddd/000000"
        });

        Promise.all([userPromise,productPromise])
        .then(function(values) {
          Review.create({
            user: values[0],
            product: values[1],
            stars: 3,
            content: "fantastical beerz"
          });
        }).then(done);
      });//closes beforeEach

        afterEach(function (done){
            Review.remove({})
            Product.remove({})
            User.remove({},done)
        });


      it('find by stars', function(done) {
        Review.findOne({ stars: 3 })
        .populate("user")
        .populate("product")
        .then(function (result) {
            expect(result.user.email).to.equal("newuser@gmail.com");
          }).then(done,done)
      });

      it('find by product static', function(done) {
        Product.findOne({ name: "Lansoprazole" })
        .populate("review")
        .then(product => {
        //  console.log(product);
          Review.findByProduct(product._id)
          .then(result => {
            //console.log("found reviews:",result)
              expect(result[0].stars).to.equal(3);
            }).then(done,done);
      })
    });

    it('find by user static', function(done) {
      User.findOne({email: "newuser@gmail.com"})
      .populate("review")
      .then(user => {
        Review.findByUser(user._id)
        .then(function (result) {
            expect(result[0].stars).to.equal(3);
          }).then(done,done)
    })
  });

  });
