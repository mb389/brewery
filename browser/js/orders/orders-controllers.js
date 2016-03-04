app.controller('FullcartController', function ($scope, pendingOrder){
  $scope.order = pendingOrder;
  console.log("HERE ARE ORDERS", pendingOrder);
  $scope.removeItem = function (productId) {
    console.log('remove', productId);
  }
  $scope.checkout = function(){
    console.log('checkout');
  }
})

app.controller('CheckoutController', function ($scope, user, pendingOrder){
  $scope.currentUser = user;
  $scope.order = pendingOrder;
})
