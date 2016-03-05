app.controller('ProductsCtrl', function ($scope, $log, allProducts, allCategories, ProductFactory) {

  $scope.products = allProducts;
  $scope.categories = allCategories;

});


app.controller('ProductCtrl', function ($scope, $log, ProductFactory, theProduct, OrderFactory) {

  $scope.product = theProduct;
  $scope.quantity=1;
  $scope.addToOrder = function (productToAdd){
    productToAdd.quantity = Number($scope.quantity);
    OrderFactory.addOrCreate(productToAdd);
    $scope.wasAdded=true;
    $timeout(function(){
      $scope.wasAdded=false;
    },50);
  }

  $scope.changeImage = function(newimg) {
    console.log(this)
    // this.src=document.getElementById('big-thumb').src;
    document.getElementById('big-thumb').src = newimg;
  }


});
