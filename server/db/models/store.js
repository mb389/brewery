'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    owner: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User',
      required: true
    },
    nameOfStore: {
      type: String,
      unique: true,
      required: true
    },
    description: {
      type: String
    },
    urlSlug: {
      type: String,
      unique: true
    },
    photo: {
      type: String,
      default: "http://lorempixel.com/300/300/people"
    },
    contact: {
      type: String
    },
    appearance: {
      type: String,
      enum: ['Happy', 'Welcoming', 'Stylish'],
      default: 'Welcoming'
    }
});

schema.pre('save', function (next){
  this.urlSlug = 'stores/' + this.nameOfStore.replace("\\s+/gi","");
  next();
})

mongoose.model('Store', schema);
