app.controller('AdminController', function($scope, ProductFactory, OrderFactory, AdminFactory, products, categories, orders) {
  $scope.products = products;
  $scope.categories = categories
  $scope.orders = orders
  $scope.productToUpdate = {};
  $scope.categoryToUpdate = {};

  $scope.populateProductForm = function(productObj) {
    $scope.productToUpdate = productObj;
  };

  $scope.populateCategory = function(categoryObj) {
    $scope.categoryToUpdate = categoryObj;
  };

  $scope.updateProduct = function() {
     if($scope.productToUpdate._id) {
      ProductFactory.editProductDetails($scope.productToUpdate._id, $scope.productToUpdate)
      $scope.productToUpdate = {};
      } else {
      ProductFactory.addProduct($scope.productToUpdate)
      $scope.productToUpdate = {};
    }
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
      $scope.productToUpdate.categories.push(categoryId);
    }
  }

  $scope.submitCategory = function(categoryObj) {
    if($scope.categoryToUpdate._id) {
      ProductFactory.updateCategory($scope.categoryToUpdate);
      $scope.categoryToUpdate = {};
    } else {
      $scope.categoryToUpdate.tags = $scope.categoryToUpdate.tags.split(",");
      ProductFactory.createCategory($scope.categoryToUpdate);
      $scope.categoryToUpdate = {};
    }
  }

  $scope.deleteCategory = function() {
    ProductFactory.deleteCategory($scope.categoryToUpdate);
    $scope.categoryToUpdate = {};
  }

});
