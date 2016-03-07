'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var _ = require('lodash');
var User = mongoose.model('User');
var Store = mongoose.model('Store');


module.exports = router;
