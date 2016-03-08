app.controller('AdminOrderController', function($scope, ProductFactory, OrderFactory, AdminFactory, UserFactory, orders, store) {
  if($scope.user.isAdmin) {
    $scope.orders = orders;
  } else {
    $scope.orders = orders.filter(ord => {
      if(store && ord.products[0].product.store === store._id) return ord;
    })
  }

  $scope.checkOrderStatus = function (order, status) {
    if(order.status === status) return true;
    return false;
  }

  $scope.changeStatus = function(order, status) {
    OrderFactory.updatedStatusForOrder(order._id, status)
    .then(updatedOrder => {
      $scope.orders = $scope.orders.map(ord => {
        if (ord._id === order._id)  {
          ord.status = updatedOrder.status
        }
        return ord;
      })
    })
  }

});
