app.controller('FullcartController', function ($scope, orders){
  $scope.orders = orders;
  $scope.removeItem = function (orderId, productId) {
    console.log('remove', orderId, productId);
  }
  $scope.checkout = function(){
    console.log('checkout');
  }
})

app.controller('CheckoutController', function ($scope, user){
  $scope.currentUser = user;
})
