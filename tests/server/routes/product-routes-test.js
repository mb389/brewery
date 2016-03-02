var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app);
chai.use(spies);
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

// Require in all models.
require('../../../server/db/models');

var Product = mongoose.model('Product');

describe('Product http requests', function () {

  beforeEach('Establish DB connection', function (done) {
     if (mongoose.connection.db) return done();
     mongoose.connect(dbURI, done);
   });

   describe('Running routes',function() {
     var newProd;
     beforeEach('Created', function (done) {
       Product.create({
         "name": "Lansoprazole",
         "description": "Dis mineral metabol NEC",
         "quantity": 20,
         "categories": ["IPA"],
         "price": 23.6,
         "photo": "http://dummyimage.com/242x118.gif/dddddd/000000"
       }).then(product => {
         newProd=product;
         done();
       });
     })

     afterEach('Clear test database', function (done) {
       clearDB(done);
     });

      it('/GET gets 200', function(done) {
      	agent
        		.get('/api/products')
        		.expect(200, done)
      });

      it('/GET returns product data', function(done) {
        agent
            .get('/api/products')
            .end(function(err,res) {
              if (err) return done (err);
              expect(res.body).to.be.an('array');
              expect(res.body[0].name).to.equal('Lansoprazole');
            done();
          });
      });

      it('/GET by Id', function(done) {
        agent
            .get('/api/products/'+newProd.id)
            .end(function(err,res) {
              if (err) return done (err);
              expect(res.body.name).to.equal('Lansoprazole');
            done();
          });
      });

      it('/GET by Category', function(done) {
        agent
            .get('/api/products/category/'+"IPA")
            .end(function(err,res) {
              if (err) return done (err);
              expect(res.body[0].name).to.equal('Lansoprazole');
            done();
          });
      });

      it('/PUT by Id', function(done) {
        agent
            .put('/api/products/'+newProd.id)
            .send({name: 'LansoBEER'})
            .expect(200)
            .end(function(err,res) {
              if (err) return done(err);
              expect(res.body.name).to.not.equal('Lansoprazole');
            done();
          });
      });

      it('/DELETE by Id', function(done) {
        agent
            .delete('/api/products/'+newProd.id)
            .expect(204, done)
      });

      it('/POST', function(done) {
        agent
            .post('/api/products/')
            .send({
              "name": "Lanny",
              "description": "Dis mineral metabol NEC",
              "quantity": 20,
              "categories": ["IPA"],
              "price": 23.6,
              "photo": "http://dummyimage.com/242x118.gif/dddddd/000000"
            })
            .end(function(err,res) {
              if (err) return done(err);
              expect(res.body.name).to.equal('Lanny');
              done();
            });
      });

    })

});
