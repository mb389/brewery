var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');


// Require in all models.
require('../../../server/db/models');

var Order = mongoose.model('Order');
var User = mongoose.model('User');


describe('Order model', () => {

  beforeEach('Establish DB connection', (done) => {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done)
  })

  afterEach('Clear test database', (done) => {
    clearDB(done);
  })

  it('should exist', () => {
    expect(Order).to.be.a('function');
  })


  describe('save validations', function () {

    describe('orders must have a user or session id', function () {

        it('succeeds with a user', function (done) {
            Order.create({user: mongoose.Types.ObjectId('569ed8269353e9f4c51617aa')})
              .then(function(order) {
                done()
              }, err => {
                console.log(err)
                done(err)
              })
        });

        it('succeeds with a session id', function (done) {
            Order.create({sessionId: '507f191'})
              .then(order => done(), err => done(err))
          });

        it('fails without a user or session ', function (done) {
            Order.create({})
            .then(order => {
              throw Error();
              done()
            }, err => {
              done()
            })
        });
    });
  })

  describe('orders only have products with quanties of numbers', function () {

    beforeEach(function (done) {
      Order.create({sessionId: '507f191'})
      .then(() => {
        done()
      })
    })

    it('suceeds when a product is added with a quantity', function (done) {
      Order.findOne({sessionId: '507f191'})
      .then(order => {
        order.products.push({product: mongoose.Types.ObjectId('569ed8269353e9f4c51617aa'), quantity: 1})
        return order.save()
        })
        .then(order => {
          done()
        })
        .then(null, error => {
          done(err);
        })

    })

    it('fails when a product is added with a non number quantity', function (done) {
      Order.findOne({sessionId: '507f191'})
      .then(order => {
        order.products.push({product: mongoose.Types.ObjectId('569ed8269353e9f4c51617aa'), quantity: 'a'})
        order.save()
        .then(order => {
          throw Error();
        })
        .then(null, err => {
          done();
        })
      })
    })
  })

  describe('Statics', function() {

    var order
    beforeEach(function (done) {
      Order.create({sessionId: '507f191'})
      .then(createdOrder => {
        order = createdOrder;
        done()
      })
    })

    describe('add or create product to order', function () {
      it('adds a product to order if it is not in cart', function (done) {
        Order.findById(order.id)
        .then(order => {
          return order.addOrCreateProduct({product: mongoose.Types.ObjectId('569ed8269353e9f4c51617aa'), quantity: 2})
        })
        .then(newOrder => {
          expect(newOrder.products.length).to.equal(1);
          expect(newOrder.products[0].quantity).to.equal(2);
          done();
        });
      });

      it('updates the quantity in the cart if product in cart', function (done) {
        Order.findById(order.id)
        .then(order => {
          return order.addOrCreateProduct({product: mongoose.Types.ObjectId('569ed8269353e9f4c51617aa'), quantity: 6})
        })
        .then(newOrder => {
          return newOrder.addOrCreateProduct({product: mongoose.Types.ObjectId('569ed8269353e9f4c51617aa'), quantity: 2})
        })
        .then(nextOrder => {
          expect(nextOrder.products.length).to.equal(1);
          expect(nextOrder.products[0].quantity).to.equal(8)
          done()
        })
        .then(null, done)
      });

    });


  });

});


