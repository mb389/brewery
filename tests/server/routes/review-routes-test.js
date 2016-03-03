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

var Review = mongoose.model('Review');
var Product = mongoose.model('Product');
var User = mongoose.model('User');

describe('Review http requests', function () {

  beforeEach('Establish DB connection', function (done) {
     if (mongoose.connection.db) return done();
     mongoose.connect(dbURI, done);
   });

   describe('Running routes',function() {
     var newRev;
     beforeEach('Created', function (done) {
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
         }).then(review => {
           newRev=review;
           done();
         });
       });
     });

     afterEach('Clear test database', function (done) {
       clearDB(done);
     });

      it('/GET gets 200', function(done) {
      	agent
        		.get('/api/reviews')
        		.expect(200, done)
      });

      it('/GET returns review data', function(done) {
        agent
            .get('/api/reviews')
            .end(function(err,res) {
              if (err) return done (err);
              expect(res.body).to.be.an('array');
              expect(res.body[0].stars).to.equal(3);
            done();
          });
      });

      it('/GET by Id', function(done) {
        agent
            .get('/api/reviews/'+newRev.id)
            .end(function(err,res) {
              if (err) return done (err);
              expect(res.body.stars).to.equal(3);
            done();
          });
      });

      it('/GET by userId', function(done) {
        agent
            .get('/api/reviews/user/'+newRev.user.id)
            .end(function(err,res) {
              if (err) return done (err);
              expect(res.body[0].stars).to.equal(3);
            done();
          });
      });

      it('/GET by productId', function(done) {
        agent
            .get('/api/reviews/product/'+newRev.product.id)
            .end(function(err,res) {
              if (err) return done (err);
              expect(res.body[0].stars).to.equal(3);
            done();
          });
      });

      it('/PUT by Id', function(done) {
        agent
            .put('/api/reviews/'+newRev.id)
            .send({stars: 4})
            .expect(200)
            .end(function(err,res) {
              if (err) return done(err);
              expect(res.body.stars).to.not.equal(3);
            done();
          });
      });

      it('/DELETE by Id', function(done) {
        agent
            .delete('/api/reviews/'+newRev.id)
            .expect(204, done)
      });

      it('/POST', function(done) {
        agent
            .post('/api/reviews/')
            .send({
              stars: 5,
              content: "fantastical beerz"
            })
            .end(function(err,res) {
              if (err) return done(err);
              expect(res.body.stars).to.equal(5);
              done();
            });
      });

    })

});
