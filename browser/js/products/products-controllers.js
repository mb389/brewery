app.controller('ProductsCtrl', function ($scope, $log, allProducts) {

  $scope.products = allProducts;

});


app.controller('ProductCtrl', function ($scope, $log, ProductFactory, theProduct) {

  $scope.product = theProduct;

});
