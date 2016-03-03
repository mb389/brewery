app.controller('FullcartController', function ($scope, orders, AuthService, UserFactory, OrderFactory){
  console.log('hihi');
  $scope.currentorders = orders;
  $scope.removeItem = function (orderId, productId) {
    console.log('remove');
  })
  $scope.checkout = function(){
    console.log('checkout');
  }
})

app.controller('CheckoutController', function ($scope, user, AuthService, UserFactory, OrderFactory){
  $scope.currentUser = user;
})
