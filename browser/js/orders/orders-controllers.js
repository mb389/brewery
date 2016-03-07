app.controller('FullcartController', function ($scope, $state, pendingOrder, OrderFactory){
  console.log('the pending order',pendingOrder);
  $scope.order = pendingOrder;
  if(pendingOrder){
    $scope.products = pendingOrder.products;
    calcTotal();
  };

  function calcTotal(){
    $scope.total = 0;
    $scope.order.products.forEach(prod => {
      $scope.total += Number(prod.quantity) * Number(prod.product.price);
    })
    $scope.total = Math.round($scope.total * 100) / 100;
  }


  $scope.removeItem = function (productToRemove) {
    console.log('heres product', productToRemove);
    OrderFactory.removeProductFromOrder($scope.order._id, productToRemove)
    .then(updatedOrder => {
      $scope.order = updatedOrder;
      calcTotal();
    })
  }

  $scope.updateOrderTotal = function(){
    $scope.inProgress = true;
    console.log('updating')
    OrderFactory.updateCurrentOrder($scope.order)
    .then(updatedOrder => {
      console.log('heres the updated order we get back', updatedOrder);
      $scope.order = updatedOrder;
      calcTotal();
      $scope.inProgress = false;
    })
  }

  $scope.checkout = function(){
    console.log('go to checkout');
    $state.go('fullcart.checkout', null, {reload: 'fullcart'});
  }

});

app.controller('CheckoutController', function ($scope, $state, pendingOrder, AuthService, OrderFactory){
   $scope.order = pendingOrder;
   if(pendingOrder) calcTotal();

   $scope.credentials;
   $scope.creditcard;

  function calcTotal (){
    $scope.total = 0;
    $scope.order.products.forEach(prod => {
      $scope.total += Number(prod.quantity) * Number(prod.product.price);
    })
    $scope.total = Math.round($scope.total * 100) / 100;
  }

  AuthService.getLoggedInUser()
    .then(user => {
      if(user) $scope.currentUser = user;
    })

  $scope.completePurchase = function (){
    $scope.inProgress = true;
    console.log('credentials', $scope.credentials);
    OrderFactory.updatedStatusForOrder($scope.order._id, 'purchased')
    .then(function(){
      $scope.inProgress = false;
      console.log('lets go');
      $state.go('fullcart.completed');
    })
  }
})

app.controller('OrderHistoryController', function ($scope, user, pastOrders){
  console.log('orderhistory info', user, pastOrders);
  $scope.currentUser = user;
  $scope.orders = pastOrders;
})


app.filter('joinArray', function(){
  return function(arr){
    return arr.join(', ');
  }
})
