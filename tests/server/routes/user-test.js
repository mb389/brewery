 // Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Promise = require('bluebird');
var User = mongoose.model('User');
var expect = require('chai').expect;
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app);

describe('User routes', function () {

  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  describe('Get all users', function () {
    var user1;
    var user2;
    var allusers;
    beforeEach('Create users', function (done) {

      var promise1 = User.create({email: 'testemail1@gmail.com', password: 'password1', orders: [ mongoose.Types.ObjectId('569ed8269353e9f4c51617aa')]});
      var promise2 = User.create({email: 'testemail2@gmail.com', password: 'password2'});
      Promise.all([promise1, promise2])
      .then(function(users){
        allusers = users;
        user1 = users[0];
        user2 = users[1];
        done();
      });
    });

    it('should return all Users', function (done) {
      agent.get('/api/users/')
        .expect(200)
        .end(function(err, res) {
          if(err) return done(err)
          expect(res.body).to.be.be.an('array');
          expect(res.body[0].email).to.equal(allusers[0].email);
          expect(res.body[1].email).to.equal(allusers[1].email);
          expect(res.body).to.have.length.of(2);
          done();
        });
    });

    it('should return one User given the id', function (done) {
       agent.get('/api/users/'+user1.id)
        .expect(200)
        .end(function(err, res) {
          if(err) return done(err)
          expect(res.body).to.not.be.an('array');
          expect(res.body.email).to.equal(user1.email);
          done();
        });
    })
    it('should return orders for a User given the id', function (done) {
       agent.get('/api/users/'+ user1.id + '/orders')
        .expect(200)
        .end(function(err, res) {
          if(err) return done(err)
          expect(res.body).to.be.an('array');
          done();
        });
    })
  });

  describe('Create and edit user', function () {
    var user1;
    var allusers;
    beforeEach('Create user', function (done) {
      User.create({email: 'testemail1@gmail.com', password: 'password1', orders: [ mongoose.Types.ObjectId('569ed8269353e9f4c51617aa')]})
      .then(function(user){
        user1 = user
        done();
      });
    });

    it('should create an new User', function (done) {
      agent.post('/api/users/')
        .send({
          email: 'mytestemail@gmail.com',
          password: 'testpassword1'
        })
        .expect(201)
        .end(function(err, res) {
          if(err) return done(err)
          expect(res.body.email).to.equal('mytestemail@gmail.com');
          done();
        });
    });

    it('should edit an existing User', function (done) {
    var oldpassword = user1.password;
    var oldId = user1._id;
      agent.put('/api/users/' + user1.id)
        .send({
          email: 'anewemail@gmail.com',
          password: 'anewpassword'
        })
        .expect(200)
        .end(function(err, res) {
          if(err) return done(err)
          expect(res.body.email).to.equal('anewemail@gmail.com');
          expect(res.body.password).to.not.equal(oldpassword)
          User.findById(oldId).exec()
          .then(user => {
            expect(res.body.email).to.equal('anewemail@gmail.com');
            expect(res.body.password).to.not.equal(oldpassword);
            done();
          })
        });
    });

    it('should return one User given the id', function (done) {
    var oldId = user1._id;
       agent.delete('/api/users/'+ user1.id)
        .expect(204)
        .end(function(err, res) {
          if(err) return done(err)
          expect(res.body).to.not.be.an('array');
          User.findById(oldId).exec()
          .then(function(user){
            expect(user).to.equal(null);
            done();
          })
        });
    })
  });
});

