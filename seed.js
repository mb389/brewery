/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Product = Promise.promisifyAll(mongoose.model('Product'));

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};

var seedProducts = function() {
  var products =
      [{
    "name": "Peptic Relief",
    "description": "Rheumatoid arthritis",
    "quantity": 30,
    "categories": "Pale Ale",
    "price": 92.3,
    "photo": "http://dummyimage.com/240x219.gif/ff4444/ffffff"
  }, {
    "name": "CARBOplatin",
    "description": "Bovine stomatitis",
    "quantity": 19,
    "categories": "Stout",
    "price": 76.1,
    "photo": "http://dummyimage.com/188x159.png/dddddd/000000"
  }, {
    "name": "Lansoprazole",
    "description": "Dis mineral metabol NEC",
    "quantity": 20,
    "categories": "IPA",
    "price": 23.6,
    "photo": "http://dummyimage.com/242x118.gif/dddddd/000000"
  }, {
    "name": "Aurax Otic",
    "description": "Unil femoral hern w gang",
    "quantity": 31,
    "categories": "Pale Ale",
    "price": 48.4,
    "photo": "http://dummyimage.com/249x155.png/cc0000/ffffff"
  }, {
    "name": "Childrens Relief Cherry",
    "description": "Noninfect dis pinna NEC",
    "quantity": 47,
    "categories": "Pale Ale",
    "price": 82.6,
    "photo": "http://dummyimage.com/146x113.jpg/dddddd/000000"
  }, {
    "name": "AllergyEase Rocky Mtns",
    "description": "Sprain sacroiliac",
    "quantity": 56,
    "categories": "IPA",
    "price": 89.1,
    "photo": "http://dummyimage.com/123x217.gif/5fa2dd/ffffff"
  }, {
    "name": "Bladder Irritation",
    "description": "Beriberi",
    "quantity": 31,
    "categories": "Pale Ale",
    "price": 16.3,
    "photo": "http://dummyimage.com/136x188.png/dddddd/000000"
  }, {
    "name": "levofloxacin",
    "description": "Paranoid state, simple",
    "quantity": 28,
    "categories": "Pale Ale",
    "price": 31.1,
    "photo": "http://dummyimage.com/182x246.png/5fa2dd/ffffff"
  }, {
    "name": "Potassium Chloride",
    "description": "Amniotic prob NOS-deliv",
    "quantity": 21,
    "categories": "IPA",
    "price": 61.2,
    "photo": "http://dummyimage.com/147x196.png/dddddd/000000"
  }, {
    "name": "Alendronate Sodium",
    "description": "Drug psy dis w hallucin",
    "quantity": 75,
    "categories": "Pale Ale",
    "price": 78.2,
    "photo": "http://dummyimage.com/208x190.jpg/dddddd/000000"
  }, {
    "name": "TRAMADOL HYDROCHLORIDE",
    "description": "Injury brachial vessels",
    "quantity": 27,
    "categories": "IPA",
    "price": 58.1,
    "photo": "http://dummyimage.com/198x130.jpg/cc0000/ffffff"
  }, {
    "name": "Gonak Hypromellose",
    "description": "Unsocial aggression-mild",
    "quantity": 12,
    "categories": "Pale Ale",
    "price": 66.9,
    "photo": "http://dummyimage.com/142x211.gif/ff4444/ffffff"
  }, {
    "name": "Prazosin Hydrochloride",
    "description": "Punctate keratitis",
    "quantity": 76,
    "categories": "Stout",
    "price": 80.8,
    "photo": "http://dummyimage.com/186x153.jpg/ff4444/ffffff"
  }, {
    "name": "Stool Softener",
    "description": "Cerebral cysts",
    "quantity": 58,
    "categories": "Pale Ale",
    "price": 53.4,
    "photo": "http://dummyimage.com/224x195.gif/dddddd/000000"
  }, {
    "name": "ANTIMICROBIAL CLEANSER",
    "description": "Fx up femur epiphy-clos",
    "quantity": 28,
    "categories": "Stout",
    "price": 71.3,
    "photo": "http://dummyimage.com/112x246.jpg/dddddd/000000"
  }, {
    "name": "skin so soft bug guard plusitch relief",
    "description": "Poisoning-androgens",
    "quantity": 40,
    "categories": "IPA",
    "price": 49.8,
    "photo": "http://dummyimage.com/226x219.png/dddddd/000000"
  }, {
    "name": "Divalproex Sodium",
    "description": "Famil heredit dis-unspec",
    "quantity": 2,
    "categories": "Stout",
    "price": 55.2,
    "photo": "http://dummyimage.com/209x117.png/cc0000/ffffff"
  }, {
    "name": "VENLAFAXINE",
    "description": "Venomous arthropods NEC",
    "quantity": 66,
    "categories": "Pale Ale",
    "price": 95.9,
    "photo": "http://dummyimage.com/215x247.gif/5fa2dd/ffffff"
  }, {
    "name": "Sumatriptan",
    "description": "Cl skl vlt fx-proln coma",
    "quantity": 7,
    "categories": "IPA",
    "price": 60.0,
    "photo": "http://dummyimage.com/239x235.gif/dddddd/000000"
  }, {
    "name": "AVERTEAX",
    "description": "Dislocat foot NEC-closed",
    "quantity": 84,
    "categories": "IPA",
    "price": 87.2,
    "photo": "http://dummyimage.com/142x122.gif/dddddd/000000"
  }]
return Product.createAsync(products);
}

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('User seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
    Product.findAsync({}).then(function (products) {
        if (products.length === 0) {
            return seedProducts();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Product seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
