app.controller('ProductsCtrl', function ($scope, $log, $rootScope, $timeout, allProducts, allCategories, ProductFactory, OrderFactory) {
  $rootScope.totalQuantity = $rootScope.totalQuantity || 0;
  $scope.products = allProducts;
  $scope.ourProducts = allProducts.filter(product => {
    return !product.store && product.quantity > 0
  })
  $rootScope.totalQuantity = $rootScope.totalQuantity || 0;
  $scope.categories = allCategories;

  $scope.addToOrder = function (productToAdd){
    productToAdd.quantity = 1;
    OrderFactory.addOrCreate(productToAdd);
    $rootScope.totalQuantity=1;
  }

});

app.controller('StoreListCtrl', function ($scope, $log, shopList, StoreFactory) {
  $scope.shoplist=shopList;
});


app.controller('StoreCtrl', function ($scope, $log, theStore, storeProducts, storeCategories) {

  $scope.store=theStore;
  // $scope.products=storeProducts;
  $scope.categories=storeCategories;

  $scope.shopBeers = storeProducts.filter(product => {
    return product.store === theStore._id
  })


});


app.controller('ProductCtrl', function ($scope, $log, ProductFactory, theProduct, OrderFactory, $timeout, productReviews, $state, ReviewFactory, $rootScope, loggedInUser) {

  $scope.product = theProduct;
  $scope.productReviews=productReviews;
  $scope.quantity=1;
  $rootScope.totalQuantity = $rootScope.totalQuantity || 0;
  $scope.loggedInUser=loggedInUser;


  $scope.addToOrder = function (productToAdd, quantity){
    productToAdd.quantity = Number(quantity);
    $scope.wasAdded=true;
    OrderFactory.addOrCreate(productToAdd)
    .then(() => {
       $rootScope.totalQuantity = Number(quantity);
    })
    $timeout(function(){
      $scope.wasAdded=false;
    },500);
  }

  $scope.defaultImg = "http://lorempixel.com/300/300/food";

  $scope.changeImage = function(newimg, caller) {
    var big = document.getElementById('big-thumb').src;
    var small1 = document.getElementById('small1').src;
    var small2 = document.getElementById('small2').src;

    if (caller === 1) {
      document.getElementById('big-thumb').src = small1;
      document.getElementById('small1').src = big;
    } else {
      document.getElementById('big-thumb').src = small2;
      document.getElementById('small2').src = big;
    }
  }

  $scope.reviewIsReadonly = false;

  $scope.saveReview = function (reviewContent,rating) {
    var newRevObj = {
      product: $scope.product._id,
      stars: rating,
      content: reviewContent
    };
    ReviewFactory.saveReview(newRevObj);

    $state.go('prodParent.oneProduct',$scope.product._id,{reload: 'prodParent'});
  }


});
