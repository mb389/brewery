'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
      type: String
    },
    description: {
      type: String
    },
    tags: [{
      type: String
    }]
});


schema.statics.getAllUniqueCats = function() {
  return this.find({})
  .then(function(cats){
    var out=[];
    cats.forEach(function(el) {
      if (out.indexOf(el.name)===-1)
        out.push(el.name);
    });
    return out;
  });
}

mongoose.model('Category', schema);
