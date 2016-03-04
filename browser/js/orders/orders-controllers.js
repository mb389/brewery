app.controller('FullcartController', function ($scope, orders){
  $scope.orders = orders;
  console.log("HERE ARE ORDERS", orders);
  $scope.removeItem = function (productId) {
    console.log('remove', productId);
  }
  $scope.checkout = function(){
    console.log('checkout');
  }
})

app.controller('CheckoutController', function ($scope, user){
  $scope.currentUser = user;
})
