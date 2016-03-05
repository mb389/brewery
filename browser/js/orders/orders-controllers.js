app.controller('FullcartController', function ($scope, pendingOrder, OrderFactory){
  console.log('the pending order',pendingOrder);
  $scope.order = pendingOrder;
  $scope.products = pendingOrder.products;

  var calcTotal = function (){
    $scope.total = 0;
    $scope.order.products.forEach(prod => {
      $scope.total += Number(prod.quantity) * Number(prod.product.price);
    })
    $scope.total = Math.round($scope.total * 100) / 100;
  }
  calcTotal();

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
    console.log('checkout');
  }

});

app.controller('CheckoutController', function ($scope, user, pendingOrder){
  $scope.currentUser = user;
  $scope.order = pendingOrder;
})

app.filter('joinArray', function(){
  return function(arr){
    return arr.join(', ');
  }
})
