app.controller('AdminController', function($scope, ProductFactory, OrderFactory, AdminFactory, products, categories) {
  $scope.products = products;
  $scope.categories = categories
  $scope.productToUpdate = {};
  console.log($scope.productToUpdate)
  console.log($scope.categories)
  console.log($scope.productToUpdate.categories)

  if($scope.productToUpdate.name) {
    console.log('should show ')
  }

  $scope.populateProductForm = function(productObj) {
    $scope.productToUpdate = productObj;
  };

  $scope.updateProduct = function() {
    console.log($scope.productToUpdate)
  }

  $scope.isBeerCategory = function(categoryId) {
    // console.log('categoryId: ', categoryId)
    // console.log('$scope.productToUpdate.categories: ', $scope.productToUpdate.categories)
    if ($scope.productToUpdate.name && $scope.productToUpdate.categories.indexOf(categoryId) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  $scope.toggleCategory =function(categoryId) {

  }


});
