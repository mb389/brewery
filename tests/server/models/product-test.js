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

var Product = mongoose.model('Product');


describe('Product model', function () {

      beforeEach('Establish DB connection', function (done) {
          if (mongoose.connection.db) return done();
          mongoose.connect(dbURI, done);

      });

      afterEach('Clear test database', function (done) {
          clearDB(done);
      });

      describe('Validation', function () {
      var product;
      beforeEach(function(){
        product = new Product;
      })

      it('should exist', function () {
          expect(Product).to.be.a('function');
      });

      it('should have a name', function() {
        product.validate(function(err){
            expect(err.errors.name).to.be.a('string');
            done();
         })
      })

      it('should have a description', function() {
        product.validate(function(err){
            expect(err.errors.description).to.be.a('string');
            done();
         })
    });
  });


  describe('Product info',function(){
    beforeEach(function(done){
      Product.create({
        "name": "Lansoprazole",
        "description": "Dis mineral metabol NEC",
        "quantity": 20,
        "categories": ["IPA"],
        "price": 23.6,
        "photo": "http://dummyimage.com/242x118.gif/dddddd/000000"
      }).then(function(){
        Product.create({
          "name": "Rando",
          "description": "whatever",
          "quantity": 25,
          "categories": ["IPA","B33R"],
          "price": 99,
          "photo": "http://dummyimage.com/242x118.gif/dddddd/000000"
        });
      }).then(done,done);
    })

    afterEach(function (done){
        Product.remove({},done)
    })

    it('find by name', function(done) {
      Product.findOne({ name: "Lansoprazole" })
      .then(function (result) {
          expect(result.quantity).to.equal(20)
        }).then(done,done)
    })

    it('find by category static finds all matches', function(done) {
      Product.findByCategory("IPA")
      .then(function (results) {
          expect(results.length).to.equal(2);
        }).then(done,done)
    })
  })


});
