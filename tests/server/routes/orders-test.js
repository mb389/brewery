 // Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Order = mongoose.model('Order');
var User = mongoose.model('User')

var expect = require('chai').expect;


var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

var agent = supertest.agent(app);

describe('Order management', function () {

  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  describe('Get all orders', function () {

    var orderCreated;
    beforeEach('Create orders', function (done) {
      Order.create({sessionId: 'test'}).then(() => {
        return Order.create({sessionId: 'test2'})
      }).then((order) => {
        orderCreated=order;
        done()
      })
    })

    it('should return all orders', function (done) {
      agent.get('/api/orders/')
        .expect(200)
        .end(function(err, res) {
          if(err) return done(err)
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length.of(2);
          done();
        });
    });

    it('should return one order given the id', function (done) {
       agent.get('/api/orders/'+orderCreated.id)
        .expect(200)
        .end(function(err, res) {
          if(err) return done(err)
          expect(res.body).to.not.be.an('array');
          expect(res.body.sessionId).to.equal('test2');
          done();
        });
    })
  });

  describe('Create orders and add products', function () {

    beforeEach('attach a session to order', function(done) {
      agent.session = {id:'someid'};
      done()
    })

    var orderCreated;
    beforeEach('Create orders in db', function (done) {
      Order.create({sessionId: 'stest'}).then(() => {
        return Order.create({sessionId: 'someid', products: [{product: mongoose.Types.ObjectId('569ed8269353e9f4c51617aa'), quantity: 1}]})
      }).then((order) => {
        orderCreated=order;
        done()
      }).then(null, err => {console.error; done()})
    })

    it('should create an order if not fed an id', function (done) {
      agent.post('/api/orders/add')
        .send({
          product: mongoose.Types.ObjectId('569ed8269353e9f4c51617aa'),
          quantity: 1
        })
        .expect(201)
        .end(function(err, res) {
          if(err) return done(err)
          expect(res.body).to.not.be.an('array');
          done();
        });
    });

    it('should return one order given the id', function (done) {
       agent.put('/api/orders/add/'+orderCreated.id)
         .send({
          product: mongoose.Types.ObjectId('569ed8269353e9f4c51617bb'),
          quantity: 1
        })
        .expect(202)
        .end(function(err, res) {
          if(err) return done(err)
          expect(res.body).to.not.be.an('array');
          expect(res.body.products).to.have.length.of(2)
          done();
        });
    })

    it('should add products to an order that exists', function (done) {
       agent.put('/api/orders/add/'+orderCreated.id)
         .send({
          product: mongoose.Types.ObjectId('569ed8269353e9f4c51617aa'),
          quantity: 1
        })
        .expect(202)
        .end(function(err, res) {
          if(err) return done(err)
          expect(res.body).to.not.be.an('array');
          expect(res.body.products).to.have.length.of(1)
          done();
        });
    })

    it('should add products to an order that exists', function (done) {
      agent.put('/api/orders/add/'+orderCreated.id)
         .send({
          product: mongoose.Types.ObjectId('569ed8269353e9f4c51617aa'),
          quantity: 4
        })
        .expect(202)
        .end(function(err, res) {
          if(err) return done(err)
          expect(res.body).to.not.be.an('array');
          expect(res.body.products).to.have.length.of(1)
          expect(res.body.products[0].quantity).to.equal(5)
          done();
        });

    })

  });

  describe('Deletes orders', function () {

    var user;
    beforeEach('register a user', function(done) {
      User.create({email: 'test@test.com', password:'test'})
      .then(userCreated => {
        user = userCreated
        done()
      })
    })

    beforeEach('attach a session to order', function(done) {
      agent.session = {id:'someid'};
      agent.user = {id:user.id}
      done()
    })

    var orderCreated;
    beforeEach('Create orders in db', function (done) {
      Order.create({sessionId: 'stest'}).then(() => {
        return Order.create({user: user._id, products: [{product: mongoose.Types.ObjectId('569ed8269353e9f4c51617aa'), quantity: 1}]})
      }).then((order) => {
        orderCreated=order;
        return User.findByIdAndUpdate(user.id,{orders:[order._id]},{new:true})
      }).then(updatedUser => {
          user = updatedUser
          console.log('user:', updatedUser);
          console.log('agent:', agent);
          console.log('order:', orderCreated);
          done()
      }).then(null, err => {console.error; done()})
    })



    it('delete order from order model when given just an order id', function (done) {
      agent.delete('/api/orders/'+orderCreated.id)
        .expect(204)
        .end(function(err, res) {
          if(err) return done(err)
          Order.find({id: orderCreated.id})
          .then(orders => {
            expect(orders).to.have.length(0)
            done();
          })
        });
    });

    it('deletes order from order model when given an order id and a user id', function (done) {
      agent.delete('/api/orders/'+orderCreated.id+'/'+user.id)
        .expect(204)
        .end(function(err, res) {
          if(err) return done(err)
          Order.find({id: orderCreated.id})
          .then(orders => {
            expect(orders).to.have.length(0)
            done();
          })
        });
    });

    it('deletes an order from the users order when given an order id and a user id', function (done) {
      agent.delete('/api/orders/'+orderCreated.id+'/'+user.id)
        .expect(204)
        .end(function(err, res) {
          if(err) return done(err)
          User.findById(user.id)
          .then(userFound => {
            expect(userFound.orders).to.have.length(0)
            done();
          })
        });
    });

  });


});
