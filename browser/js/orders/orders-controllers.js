app.controller('FullcartController', function ($scope, $rootScope, $state, pendingOrder, OrderFactory){
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
    OrderFactory.removeProductFromOrder($scope.order._id, productToRemove)
    .then(updatedOrder => {
      $scope.order = updatedOrder;
      calcTotal();
      $rootScope.totalQuantity = -Number(productToRemove.quantity);
    })
  }

  $scope.updateOrderTotal = function(){
    $scope.inProgress = true;
    OrderFactory.updateCurrentOrder($scope.order)
    .then(updatedOrder => {
      $scope.order = updatedOrder;
      calcTotal();
      $rootScope.totalQuantity = 0;
      $scope.inProgress = false;
    })
  }

  $scope.checkout = function(){
    $state.go('fullcart.checkout', null, {reload: 'fullcart'});
  }

});

app.controller('CheckoutController', function ($scope, $rootScope, $state, pendingOrder, AuthService, OrderFactory){
   $scope.order = pendingOrder;
   if(pendingOrder) calcTotal();
   $scope.products = pendingOrder.products;

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
    OrderFactory.updatedStatusForOrder($scope.order._id, 'purchased')
    .then(function(){
      calcTotal()
      $rootScope.totalQuantity = null;
      $scope.inProgress = false;
      $state.go('fullcart.completed', null, {reload: 'fullcart'});
    })
  }
})

app.controller('OrderHistoryController', function ($scope, user, pastOrders){
  $scope.currentUser = user;
  $scope.orders = pastOrders;
})


app.filter('joinArray', function(){
  return function(arr){
    return arr.join(', ');
  }
})
