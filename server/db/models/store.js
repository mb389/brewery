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
      unique: true,
      set: convertSlug
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

function convertSlug(){
  return 'stores/' + this.name.replace("\\s+/gi","");
}

mongoose.model('Store', schema);
