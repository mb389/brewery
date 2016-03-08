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
var Category = Promise.promisifyAll(mongoose.model('Category'));
var Order = Promise.promisifyAll(mongoose.model('Order'));
var Review = Promise.promisifyAll(mongoose.model('Review'));


var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            firstName: 'Test',
            lastName: 'Tester',
            streetAddress: '1 Test Dr',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            phone: '123-456-7890'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            firstName: 'Barack',
            lastName: 'Obamacare',
            streetAddress: '1600 Penn',
            city: 'New York',
            state: 'DC',
            zip: '10001',
            phone: '123-456-7890'
        },
        {
            email: 'jordan@bros.com',
            password: 'bros',
            isAdmin: true
        },
        {
            email: 'mike@bros.com',
            password: 'bros',
            isAdmin: true
        },
        {
            email: 'cody@bros.com',
            password: 'bros',
            isAdmin: true
        }
    ];

    return User.createAsync(users);

};

var seedCategories = function () {
  var categories = [
    {
    name: 'IPA',
    description: 'Hoppy as a mother',
    tags: ['Hoppy', 'Bitter', 'Delicious']
    },
    {
    name: 'Stout',
    description: 'Dark brew - think Guiness',
    tags: ['Heavy', 'Dark', 'Delicious']
    },
    {
    name: 'Pilsner',
    description: 'Eastern European brew',
    tags: ['Lightish', 'Delicious']
    },
    {
    name: 'Light',
    description: 'Frat Soda',
    tags: ['Natty', 'Water']
    },
    {
    name: 'Lager',
    description: "Your Grandfather's beer",
    tags: ['Normal', 'Delicious']
    },
  ]

  return Category.createAsync(categories)

}


var seedReviews = function (reviewObj) {
  var products = reviewObj.products
  var users = reviewObj.users

  console.log('this is our review obj', reviewObj);
  var reviews = [
    {
    stars: randomIndexAssigner(5)+1,
    content: 'This beer is dank',
    user: users[randomIndexAssigner(5)]._id,
    product: products[randomIndexAssigner(10)]._id
    },
    {
    stars: randomIndexAssigner(5)+1,
    content: 'This beer is dope',
    user: users[randomIndexAssigner(5)]._id,
    product: products[randomIndexAssigner(10)]._id
    },
    {
    stars: randomIndexAssigner(5)+1,
    content: 'This beer is ehhh',
    user: users[randomIndexAssigner(5)]._id,
    product: products[randomIndexAssigner(10)]._id
    },
    {
    stars: randomIndexAssigner(5)+1,
    content: 'This beer is good',
    user: users[randomIndexAssigner(5)]._id,
    product: products[randomIndexAssigner(10)]._id
    },
    {
    stars: randomIndexAssigner(5)+1,
    content: 'This beer is strong',
    user: users[randomIndexAssigner(5)]._id,
    product: products[randomIndexAssigner(10)]._id
    },

  ]

  return Review.createAsync(reviews)

}


var seedOrders = function (reviewObj) {
  var products = reviewObj.products
  var users = reviewObj.users

  var orders = [
  {
    user: users[randomIndexAssigner(5)]._id,
    status: 'pending',
    products: [
      {product: products[randomIndexAssigner(10)]._id, quantity: 2},
      {product: products[randomIndexAssigner(10)]._id, quantity: 1}
    ],
    subtotal: 20
  },
  {
    user: users[randomIndexAssigner(5)]._id,
    status: 'pending',
    products: [
      {product: products[randomIndexAssigner(10)]._id, quantity: 2},
      {product: products[randomIndexAssigner(10)]._id, quantity: 1}
    ],
    subtotal: 20
  },
  {
    user: users[randomIndexAssigner(5)]._id,
    status: 'pending',
    products: [
      {product: products[randomIndexAssigner(10)]._id, quantity: 2},
      {product: products[randomIndexAssigner(10)]._id, quantity: 1}
    ],
    subtotal: 20
  },
  {
    user: users[randomIndexAssigner(5)]._id,
    status: 'pending',
    products: [
      {product: products[randomIndexAssigner(10)]._id, quantity: 2},
      {product: products[randomIndexAssigner(10)]._id, quantity: 1}
    ],
    subtotal: 20
  }
  ]

  return Order.createAsync(orders)
}


function randomIndexAssigner(max) {
  return Math.floor((Math.random()*max))
}


var seedProducts = function(createdCategories) {


  var products =
[ { name: 'Murphy\'s Stout',
    description: 'Pasteurised in cans, bottles and kegs, with nitrogen. 4.3% in bottles. Contract brewed by Interb..',
    price: 8.99,
    quantity: 50,
    categories: createdCategories[randomIndexAssigner(5)]._id,
    picture: 'http://www.craftbeerkings.com/image/cache/data/Beer3/murphysstout-cans-130x130.JPG' },
  { name: 'Avery Ellies Brown Ale',
    description: 'he beer is a dark brown with a ruby tint that comes through in the light. A dark cream colored h..',
    price: 2.99,
    quantity: 50,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/beer-2/avery-elliesbrown-130x130.JPG' },
  { name: 'Avery Ipa',
    description: 'olden color with a dense off white head. The aroma is big and citrusy that screams off the wall ..',
    price: 10.99,
    quantity: 50,
    categories: createdCategories[randomIndexAssigner(5)]._id,
        picture: 'http://www.craftbeerkings.com/image/cache/data/beer-2/avery-ipa-130x130.JPG' },
  { name: 'Oskar Blues Mamas Little Yella Pils',
    description: 'skar Blues\' newest beer is an uncompromising, small-batch version of the beer that made Pilsen, ..',
    price: 9.99,
    quantity: 50,
    categories: createdCategories[randomIndexAssigner(5)]._id,
    picture: 'http://www.craftbeerkings.com/image/cache/data/DSC_0538-130x130.jpg' },
  { name: 'Oskar Blues Old Chub',
    description: 'ld Chub is a Scottish style ale brewed with copious amounts of crystal and chocolate malts, and ..',
    price: 10.99,
    quantity: 50,
    categories: createdCategories[randomIndexAssigner(5)]._id,

    picture: 'http://www.craftbeerkings.com/image/cache/data/DSC_0536-130x130.jpg' },
  { name: 'Beer Can Basket (FREE SHIPPING)',
    description: 'omprised of 24 12 oz craft beer cans.\n..',
    price: 99.99,
    quantity: 50,
    categories: createdCategories[randomIndexAssigner(5)]._id,

    picture: 'http://www.craftbeerkings.com/image/cache/data/Gift%20Basket/beer-canbasket-130x130.jpg' },
  { name: 'Stoli Ginger Beer (Non Alcoholic)',
    description: 'ot just another pretty soft drink: Stoli Ginger Beer flat-out tastes great, thanks to real ginge..',
    price: 6.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/stoil-130x130.jpg' },
  { name: 'Pick Six Pilsner',
    description: 'ilsner malt and American 2-row with Czech Saaz and Hallertau Blanc hops\n..',
    price: 10.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
        picture: 'http://www.craftbeerkings.com/image/cache/data/picksix-130x130.jpg' },
  { name: 'Kook D.I.P.A.',
    description: 'Every surfer remembers catching their first wave. The Kook DIPA is in honor of everyone that goe..',
    price: 12.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,

    picture: 'http://www.craftbeerkings.com/image/cache/data/beer/pizza-kook-130x130.JPG' },
  { name: 'Kolschtal Eddy',
    description: ' clean, crisp, delicately balanced beer usually with very subtle fruit flavors and aromas. Subdu..',
    price: 9.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/eddydude-130x130.jpg' },
  { name: 'Blond Ale',
    description: 'odeled after the bright, beautiful ales of Koln, our interpretation has a clean, crisp malt char..',
    price: 9.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/Beer3/saintarcher-blondale-130x130.JPG' },
  { name: 'Golden Road Hefeweizen',
    description: 'ur first beer, a German style Hefeweißen, brewed with honey and northern California citrus fruit..',
    price: 8.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
        picture: 'http://www.craftbeerkings.com/image/cache/data/hefegr-130x130.jpg' },
  { name: 'Claritas Kölsch',
    description: ' crisp and authentic German-style beer, our Claritas features light fruit-like aromatics, along ..',
    price: 10.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
        picture: 'http://www.craftbeerkings.com/image/cache/data/Beer4/mikehess-claritas-130x130.JPG' },
  { name: 'Nitro IPA',
    description: 'itro IPA is boldly bitter yet surprisingly smooth. Nitro can mute aroma and leave bitterness, pa..',
    price: 9.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
    picture: 'http://www.craftbeerkings.com/image/cache/data/DSC_02989-130x130.jpg' },
  { name: 'IPA Can Basket (FREE SHIPPING)',
    description: 'omprised of 12 - 12 oz canned IPA\'s\n..',
    price: 69.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,

    picture: 'http://www.craftbeerkings.com/image/cache/data/Gift%20Basket/ipacan-130x130.jpg' },
  { name: 'Stoli Fire & Spice Cinnamon Ginger Beer (Non Alcoholic)',
    description: ' premium sparkling mixer from the house of Stolichnaya infused with spicy cinnamon, ginger and a..',
    price: 6.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/DSC_0745-130x130.jpg' },
  { name: 'Not Your Fathers Root Beer (5.9%)',
    description: 'asting Notes: Silky, smooth and satisfying finish in unmatched in flavor. It appeals to cra..',
    price: 13.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
        picture: 'http://www.craftbeerkings.com/image/cache/data/DSC_0508-130x130.JPG' },
  { name: 'Me So Honey (6 pack)',
    description: 'his beer is smooth with lingering tastes of honey. It is made right here in Poway from wild flow..',
    price: 9.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/Beer3/belching-mesohoney6-130x130.JPG' },
  { name: 'Juicebox Series - Blood Orange',
    description: 'e’re coming out of the gate strong with the first offering in our Juicebox seasonal series. We p..',
    price: 9.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/DSC_0738-130x130.jpg' },
  { name: 'Pale Ale (6 pack)',
    description: 'alanced toward the hoppy end of the spectrum, this straight-foward, California-style pale is emi..',
    price: 9.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,

    picture: 'http://www.craftbeerkings.com/image/cache/data/Beer3/saintarcher-paleale-130x130.JPG' },
  { name: 'Gose To Hollywood',
    description: 'tyle: Gose with OrangesMalts: Pilsner, Biscuit, Cara Pils, Wheat, Unmalted WheatHops: Citra To Ø..',
    price: 5.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
    picture: 'http://www.craftbeerkings.com/image/cache/data/gosetoholly-130x130.jpg' },
  { name: 'Grapefruit Sculpin 6 pack cans',
    description: 'ur Grapefruit Sculpin is the latest take on our signature IPA. Some may say there are few ways t..',
    price: 14.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/beer-2/ballast-grape6pack-130x130.JPG' },
  { name: 'Nitro White Ale',
    description: 'itro beers are known for their captivating cascade and smooth creaminess.  Yet, for many, n..',
    price: 9.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/DSC_02990-130x130.jpg' },
  { name: 'Chronic Ale (6 pack)',
    description: 'ellow amber ale is clean and easy drinking. The malt forward flavor is supported by hints of car..',
    price: 9.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
        picture: 'http://www.craftbeerkings.com/image/cache/data/Beer3/pizzaport-chronicale-130x130.JPG' },
  { name: 'Rogue Farms 6 Hop IPA',
    description: 'he first in a fresh crop of Rogue Farms IPAs, crafted entirely from ingredients we grow ourselve..',
    price: 7.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
        picture: 'http://www.craftbeerkings.com/image/cache/data/hop6-130x130.jpg' },
  { name: 'Pub Beer',
    description: 'ours a finger of head on a clear light straw body.\nThe aroma is a metallic grain smell.\n..',
    price: 9.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
        picture: 'http://www.craftbeerkings.com/image/cache/data/pub%20beer-130x130.jpg' },
  { name: 'AC DC Rock or Bust',
    description: 'erman Beer meets Australian Hardrock.\n..',
    price: 2.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/Beer3/acdc-cans-130x130.JPG' },
  { name: 'Surfrider',
    description: 'he Dudes’ and The Surfrider Foundation love our oceans, waves, and beaches and believe there are..',
    price: 9.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
    picture: 'http://www.craftbeerkings.com/image/cache/data/DSC_0733-130x130.jpg' },
  { name: 'Tricycle Grapefruit Radler',
    description: 'ur European-style Radler is the drink of champions. Tart grapefruit juice and crisp lager combin..',
    price: 9.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
        picture: 'http://www.craftbeerkings.com/image/cache/data/tricycle-130x130.jpg' },
  { name: 'Ginja Ninja',
    description: 'ur redheaded cider samurai sliced thousands of pounds of fresh apples and pure ginger root to cr..',
    price: 9.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
        picture: 'http://www.craftbeerkings.com/image/cache/data/DSC_04730-130x130.jpg' },
  { name: 'Pronto S.I.P.A. (6 Pack)',
    description: 'essionable India Pale Ale named after a beach and surfing location in Carlsbad, Ca.\n..',
    price: 10.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,

    picture: 'http://www.craftbeerkings.com/image/cache/data/Beer3/pizzaport-ponto-130x130.JPG' },
  { name: 'Pale Ale The Original',
    description: 'erman-style Pale Ale, inspired by the Kolsch Ales of Cologne, Germany. Our Pale Ale drinks like ..',
    price: 10.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
        picture: 'http://www.craftbeerkings.com/image/cache/data/pale%20ale%20ball-130x130.jpg' },
  { name: 'Black House',
    description: 'lack House is an oatmeal coffee stout bursting with coffee aroma and flavor. Modern Times is one..',
    price: 10.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/beer-2/moderntimes-blackhousecans-130x130.JPG' },
  { name: 'Swamis I.P.A. 6 Pack',
    description: 'It’s hard to believe we’ve been slingin’ pizzas for 20 years since March of 1987! That’s about 7..',
    price: 12.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/Beer6/pizzaport-swamis-130x130.JPG' },
  { name: 'Guinness Nitro IPA',
    description: 'nfused with Nitrogen for a smooth balanced finish. Admiral, Celeia, Topaz, Challenger and Cascad..',
    price: 10.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/niro%20ipa-130x130.jpg' },
  { name: 'Belgian White (4 pack)',
    description: 'e’ve shaken up traditional tastes by brewing a spiced Belgian-style wheat ale with real orange, ..',
    price: 7.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
        picture: 'http://www.craftbeerkings.com/image/cache/data/Beer3/shocktop-cans-130x130.JPG' },
  { name: 'Double Trunk',
    description: 'hey say an elephant never forgets. When it comes to this double IPA, you won’t either. This gent..',
    price: 10.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/trunk-130x130.jpg' },
  { name: 'Sleepy Dog Wet Snout Milk Stout',
    description: ' dark, rich, aromatic, and malty specialty. Rottie fans tend to be pushy and territorial, so und..',
    price: 11.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/wwetsnout-130x130.jpg' },
  { name: 'Brew Free Or Die',
    description: 'REW FREE! OR DIE IPA is brewed with some serious west coast attitude. This aromatic golden IPA s..',
    price: 10.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
        picture: 'http://www.craftbeerkings.com/image/cache/data/beer-2/brewfree-130x130.JPG' },
  { name: 'Barritts Bermuda Ginger Beer',
    description: 'arritt\'s Ginger Beer is a non-alcoholic soft drink often used as a versatile mixer in today\'s po..',
    price: 10.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/DSC_0439-130x130.jpg' },
  { name: 'Big Eye IPA',
    description: 'ur Big Eye IPA is a big hoppy brew, thanks to the abundance of American Columbus and Centennial ..',
    price: 10.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/Big%20eye-130x130.jpg' },
  { name: 'Blazing World',
    description: 'his beer is the stickiest of the icky. It\'s a luxuriously hoppy amber loaded up with intemperate..',
    price: 10.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
    picture: 'http://www.craftbeerkings.com/image/cache/data/beer-2/modern-blazingcans-130x130.JPG' },
  { name: 'Row Hard Root Beer',
    description: 'oot Sellers Row Hard Root Beer is an alcoholic root beer brewed with pure cane sugar, molasses, ..',
    price: 10.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
    picture: 'http://www.craftbeerkings.com/image/cache/data/root-130x130.jpg' },
  { name: 'Lucky Buddha Enlightened Beer',
    description: 'ight aromas of hops with nuances of honey & malt, which pre-announces the transcending flavo..',
    price: 10.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,

    picture: 'http://www.craftbeerkings.com/image/cache/data/lucky%20buddah-130x130.jpg' },
  { name: 'Get Up Offa That Brown (6 pack)',
    description: ' more traditional English-style brown, emphasizing sweetness and a smoked malt flavoring.\n&n..',
    price: 9.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
    picture: 'http://www.craftbeerkings.com/image/cache/data/Beer3/goldenroad-getupcans-130x130.JPG' },
  { name: 'Goglings Ginger Beer (Non Alcoholic)',
    description: 'aking a delicious Dark ‘n Stormy® is a breeze. As always, start with two ounces of deep, rich Go..',
    price: 9.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/DSC_0743-130x130.jpg' },
  { name: 'Down to Earth',
    description: 'own to Earth is the natural evolution (pun intended) of Bitter American, our original session al..',
    price: 10.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,

    picture: 'http://www.craftbeerkings.com/image/cache/data/beer-2/downtoearth-130x130.JPG' },
  { name: 'E40',
    description: '-40 got his name drinking 40oz beers on the 3300 block of Magazine Street in the hillside of Val..',
    price: 3.49,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/DSC_0694-130x130.jpg' },
  { name: 'Saint Archer IPA',
    description: 'verything you would expect from a great American India Pale Ale: Hop-forward, yet civilized. Bit..',
    price: 9.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
        picture: 'http://www.craftbeerkings.com/image/cache/data/saintipa-130x130.jpg' },
  { name: 'Lomaland',
    description: 'omaland is an earthy, rustic Belgian-style farmhouse ale that\'s both complex and quaffable. It s..',
    price: 10.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,

    picture: 'http://www.craftbeerkings.com/image/cache/data/beer-2/moderntimes-lomaland-130x130.JPG' },
  { name: 'Boddingtons Pub Ale',
    description: 'an: Pasteurised. Nitro widget.\nAlso sold as Boddington’s Gold and Boddington’s Export.\nS..',
    price: 9.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
    picture: 'http://www.craftbeerkings.com/image/cache/data/buddingtons-130x130.jpg' },
  { name: 'Cali Creamin\' (6 pack)',
    description: 'ours a gold/orange with an off white head that leaves some lacing, but not very much. Scents of ..',
    price: 10.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
        picture: 'http://www.craftbeerkings.com/image/cache/data/Beer3/calicream-cans-130x130.JPG' },
  { name: 'Goslings Diet Ginger Beer (Non Alcholic)',
    description: 'aking a delicious Dark ‘n Stormy® is a breeze. As always, start with two ounces of deep, rich Go..',
    price: 9.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/diet%20gg-130x130.jpg' },
  { name: 'Elysian He Said (Belgian Triple/ Baltic Porter pumpkin variety 4PKC)',
    description: 'elgian - Style Triple:\nThe story starts in 2010 when Dick Cantwell walked into our San Franc..',
    price: 12.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
        picture: 'http://www.craftbeerkings.com/image/cache/data/He%20Said%20%282%29-130x130.JPG' },
  { name: 'Joe\'s Premium American Pilsner',
    description: 'a contemporary rendition of a classic style. Hopped with purpose, Joe\'s is beautifully bitter an..',
    price: 8.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/joespils-130x130.jpg' },
  { name: 'Liliko\'i Kepolo 4 pack',
    description: 'it beer with Passionfruit\n..',
    price: 10.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
        picture: 'http://www.craftbeerkings.com/image/cache/data/beer-2/avery-liliko%27i-130x130.JPG' },
  { name: 'S.A. White Ale',
    description: 'rewed with high quality Pilsner and Wheat malts, generously spiced with coriander and whole nave..',
    price: 9.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/Beer3/saintarcher-whiteale-130x130.JPG' },
  { name: 'Easy Jack Session IPA',
    description: 'rewmaster Matt Brynildson went to the mountain and returned with a vision for a different kind o..',
    price: 10.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/easyjack-130x130.jpg' },
  { name: 'Fortunate Islands',
    description: 'ortunate Islands shares the characteristics of an uber-hoppy IPA and an easy drinking wheat beer..',
    price: 10.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/beer-2/modern-fourtunate-130x130.JPG' },
  { name: 'Nitro Coffee Stout',
    description: 'itro Coffee Stout is darkly enticing with its smooth, velvety cream that cascades into a jet bla..',
    price: 10.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
    picture: 'http://www.craftbeerkings.com/image/cache/data/DSC_02888-130x130.jpg' },
  { name: 'Saint Archer x Girl Skateboards Hoppy Pilsner (Limit 1)',
    description: 'an Diego\'s Saint Archer Brewing Company is proud to announce a very special release—and our..',
    price: 12.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/Beer3/saintarcher-girl-130x130.JPG' },
  { name: 'Toaster Pastry',
    description: 'iscuit malts give the beer a slightly nutty, crust-like flavor, while pale and dark Crystal malt..',
    price: 3.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,

    picture: 'http://www.craftbeerkings.com/image/cache/data/21-130x130.JPG' },
  { name: 'Oskar Blues Deviant Dales',
    description: 'his beer is intended to be a sensory assault for hop lovers. At 8.0% ABV, four hop additions dur..',
    price: 11.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
        picture: 'http://www.craftbeerkings.com/image/cache/data/DSC_0532-130x130.jpg' },
  { name: 'Booming Rollers',
    description: 'amed for The Big Lake of the Booming Rollers in Carl Sandburg’s "Rootabaga Stories"-- a beloved ..',
    price: 10.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,

    picture: 'http://www.craftbeerkings.com/image/cache/data/%20boomingwo-130x130.jpg' },
  { name: 'IPA 4pk cans 16oz',
    description: 'ours a medium orange to amber color with medium tan head. Aroma is musty and slightly spi..',
    price: 12.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
    picture: 'http://www.craftbeerkings.com/image/cache/data/wolf%20amoung%20weeds-130x130.png' },
  { name: 'Death by Coconut',
    description: 'eath By Coconut is an Irish porter aged on dessicated coconut and dark chocolate from Robin Choc..',
    price: 11.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/Beer5/oscarblues-deathbycocnut-130x130.JPG' },
  { name: 'Hop Highway (6 Pack)',
    description: 'amed after California’s Highway 78, this India Pale Ale was brewed in commemoration of the 50th ..',
    price: 11.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/Beer3/belchingbeaver-hophighwaycans-130x130.JPG' },
  { name: 'Back In Black',
    description: 'nspired by Paul Revere’s midnight ride, we rebelled against the British style IPA, embraced the ..',
    price: 10.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/beer-2/backinblack-130x130.JPG' },
  { name: 'Easy Beaver (6 Pack)',
    description: 'asy Beaver is brewed just in time for the Spring and Summer seasons; designed to keep you refres..',
    price: 11.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
    picture: 'http://www.craftbeerkings.com/image/cache/data/Beer3/belchingbeaver-easybeaver-130x130.JPG' },
  { name: 'Boo Koo',
    description: 'here is something really intriguing about a beer that is light in color, yet still infused with ..',
    price: 10.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,

    picture: 'http://www.craftbeerkings.com/image/cache/data/Beer3/motherearth-bookoo-130x130.JPG' },
  { name: 'Raja Double IPA',
    description: 'razenly Bitter.  Dashingly dry-hopped.  Raja is an audacious addition to our lengthy l..',
    price: 11.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
    picture: 'http://www.craftbeerkings.com/image/cache/data/Beer3/avery-rajacans-130x130.JPG' },
  { name: 'Czech Yo Self',
    description: 'oppy Czech Style Pilsener\n..',
    price: 9.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/Czechy-130x130.jpg' },
  { name: 'Blood Orange Wit',
    description: 'y using over 200lbs of fresh blood oranges in every batch, we end up with a beer that explodes w..',
    price: 9.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/Beer3/bloodorange-wit-130x130.JPG' },
  { name: 'Mango Even Keel',
    description: 'trong mango aromas just opening up the can. Taste is heavy on the mango with some nice hop under..',
    price: 12.99,
    quantity: 6,
    categories: createdCategories[randomIndexAssigner(5)]._id,
    picture: 'http://www.craftbeerkings.com/image/cache/data/DSC_0292-130x130.jpg' },
  { name: 'E40 (40oz)',
    description: '-40 got his name drinking 40oz beers on the 3300 block of Magazine Street in the hillside of Val..',
    price: 4.99,
    quantity: 12,
    categories: createdCategories[randomIndexAssigner(5)]._id,
      picture: 'http://www.craftbeerkings.com/image/cache/data/DSC_0696-130x130.jpg' } ]

return Product.createAsync(products);
}

var objToPass ={};
connectToDb.then(function () {
    Category.findAsync({}).then(categories => {
      if (categories.length === 0) {
        return seedCategories();
      } else {
        console.log(chalk.magenta('Seems to already be category data, exiting!'));
        // process.kill(0);
      }
    }).then(function (categories) {
        console.log(chalk.green('Category seed successful!'));
        return Product.findAsync({}).then(function (products) {
          if (products.length === 0) {
              return seedProducts(categories);
          }
        })
        // process.kill(0);
    }).then(function (products) {
      objToPass.products = products
      return User.findAsync({}).then(users => {
        if (users.length === 0) {
          return seedUsers()
        }
      })
    }).then(users => {
      objToPass.users = users
      return seedReviews(objToPass)
    }).then(reviews => {
      return Order.findAsync({}).then(orders => {
        if (orders.length === 0) {
          return seedOrders(objToPass)
        }
      })
    })
    .then(() => {
      console.log(chalk.green('Whole thang seeded!'));
      process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});


