app.controller('AdminCatController', function($scope, ProductFactory, OrderFactory, AdminFactory, UserFactory, categories) {
  $scope.categories = categories;
  $scope.categoryToUpdate = {};


  $scope.populateCategory = function(categoryObj) {
    $scope.categoryToUpdate = categoryObj;
  };


  $scope.submitCategory = function(categoryObj) {
    if($scope.categoryToUpdate._id) {
      ProductFactory.updateCategory($scope.categoryToUpdate)
      .then(updatedCategory => {
        $scope.categories = $scope.categories.map(cat => {
          if(cat._id === updatedCategory._id) return updatedCategory;
          else return cat;
        })
        $scope.categoryToUpdate = {};
      });
    } else {
      $scope.categoryToUpdate.tags = $scope.categoryToUpdate.tags.split(",");
      ProductFactory.createCategory($scope.categoryToUpdate)
      .then(createdCat => {
        $scope.categories.push(createdCat)
        $scope.categoryToUpdate = {};
      })
    }
  }

  $scope.deleteCategory = function() {
    ProductFactory.deleteCategory($scope.categoryToUpdate)
    .then(() => {
      $scope.categories = $scope.categories.filter(cat => {
        if(cat._id !== $scope.categoryToUpdate._id) return cat;
      })
      $scope.categoryToUpdate = {};
    })

  }

});
