app.controller('ProductsCtrl', function ($scope, $log, allProducts, allCategories, ProductFactory) {

  $scope.products = allProducts;
  $scope.categories = allCategories;

});


app.controller('ProductCtrl', function ($scope, $log, ProductFactory, theProduct, OrderFactory, $timeout, productReviews, $state, ReviewFactory) {

  $scope.product = theProduct;
  $scope.productReviews=productReviews;
  $scope.quantity=1;

  $scope.addToOrder = function (productToAdd){
    productToAdd.quantity = Number($scope.quantity);
    OrderFactory.addOrCreate(productToAdd);
    $scope.wasAdded=true;
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

  $scope.saveReview = function (productId) {
    ReviewFactory.saveReview({
      product: productId,
      stars: $scope.rating,
      content: $scope.reviewContent
    })
    $state.go('prodParent.oneProduct', {id: productId})
  }


});
