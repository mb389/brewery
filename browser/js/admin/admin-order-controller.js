app.controller('AdminOrderController', function($scope, ProductFactory, OrderFactory, AdminFactory, UserFactory, orders) {
  $scope.orders = orders;

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
