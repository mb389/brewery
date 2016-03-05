app.controller('AdminController', function($scope, ProductFactory, OrderFactory, AdminFactory, products, categories) {
  $scope.products = products;
  $scope.categories = categories
  $scope.productToUpdate = {};

  $scope.populateProductForm = function(productObj) {
    $scope.productToUpdate = productObj;
  };

  $scope.updateProduct = function() {
    ProductFactory.editProductDetails($scope.productToUpdate._id, $scope.productToUpdate)
  }

  $scope.isBeerCategory = function(categoryId) {
    if ($scope.productToUpdate.name && $scope.productToUpdate.categories.indexOf(categoryId) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  $scope.toggleCategory =function(categoryId) {
    if ($scope.productToUpdate.name && $scope.productToUpdate.categories.indexOf(categoryId) !== -1) {
      $scope.productToUpdate.categories.splice($scope.productToUpdate.categories.indexOf(categoryId), 1)
    } else {
      $scope.productToUpdate.categories.push(categoryId)
    }
  }


});
