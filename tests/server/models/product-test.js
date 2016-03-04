var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
var supertest = require('supertest');
var _ = require('lodash');
// var app = require('../app');
// var agent = supertest.agent(app);
chai.use(spies);
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

// Require in all models.
require('../../../server/db/models');

var Product = mongoose.model('Product');
var Category = mongoose.model('Category');


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
    var IPACategory;
    beforeEach(function(done){
        return Category.create({
          name: 'IPA',
          description: 'Indian Pale Ale',
          tags: 'hoppy',
        }).then(function(category){
          console.log('CATEGORY', category);
          IPACategory = category;
          Product.create({
            "name": "Lansoprazole",
            "description": "Dis mineral metabol NEC",
            "quantity": 20,
            "categories": IPACategory._id,
            "price": 23.6,
            "photo": "http://dummyimage.com/242x118.gif/dddddd/000000"
          })
      }).then(function(){
        Product.create({
          "name": "Rando",
          "description": "whatever",
          "quantity": 25,
          "categories": IPACategory._id,
          "price": 99,
          "photo": "http://dummyimage.com/242x118.gif/dddddd/000000"
        });
        done()
      }).then(null, done);
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
      Product.find({}).populate('categories').exec()
      .then(function (results) {
          var productsOfCategory = results.filter(function(product){
            if(_.find(product.categories, {'name': 'IPA' })) return true;
          })
          expect(productsOfCategory.length).to.equal(2);
        }).then(done,done)
    })
  })


});
