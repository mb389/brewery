app.controller('FullcartController', function ($scope, pendingOrder){
  console.log('the pending order',pendingOrder);
  $scope.order = pendingOrder;
  $scope.products = pendingOrder.products;
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

app.filter('joinArray', function(){
  return function(arr){
    return arr.join(', ');
  }
})
