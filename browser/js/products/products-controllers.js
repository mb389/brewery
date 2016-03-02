app.controller('ProductsCtrl', function ($scope, $log, allProducts) {

  $scope.products = allProducts;

});

/* ARTIST (SINGULAR) CONTROLLER */

juke.controller('ProductCtrl', function ($scope, $log, ProductFactory, theProduct) {

  $scope.product = theProduct;

});
