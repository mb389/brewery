app.factory('OrderFactory', function ($http, AuthService){

  return {
    getAllOrders: function (){
      return $http.get('/api/orders/')
        .then(response => response.data)
    },
    getOrderById: function (orderId){
      return $http.get('/api/orders/' + orderId)
        .then(response => response.data)
    },
    updateCurrentOrder: function (orderToUpdate) {
      return $http.put('/api/orders/update/' + orderToUpdate._id, orderToUpdate)
        .then(response => response.data)
    },
    getOrderByUserIdOrSessionId: function (userId) {
      return $http.get('/api/orders/user/session/' + userId)
        .then(response => response.data)
    },
    getPastOrdersForLoggedInUser: function (userId){
      return $http.get('/api/orders/user/' + userId)
        .then(response => response.data)
    },
    getOrderBySessionId: function (){
      return $http.get('/api/orders/session/')
        .then(response => response.data)
    },
    addOrCreate: function(productToAdd) {
      return AuthService.getLoggedInUser()
      .then(function (user){
        return user ? $http.get('/api/orders/user/session/' + user._id): $http.get('/api/orders/session/')
      })
      .then(function (orderResponse){
        var order = orderResponse.data
        //if theres and order update it with the product & quantity otherwise create
        if(order) {
          return $http.put('/api/orders/' + order._id, productToAdd)
          .then( response => response.data)
        } else {
          return $http.post('/api/orders/', productToAdd)
          .then( response => response.data)
        }
      })
    },
    removeProductFromOrder: function (orderId, productToRemove){
      return $http.delete('/api/orders/product/' + orderId + '/' + productToRemove._id)
        .then( response => response.data)
    },
    updateOrAddProductToOrder: function (orderId, productToAdd){
      return $http.put('/api/orders/' + orderId, productToAdd)
        .then( response => response.data)
    },
    createOrderAndAddProduct: function (productToAdd){
      return $http.post('/api/orders/', productToAdd)
      .then( response => response.data)
    },
    purchaseOrder: function (orderId){
      return $http.put('/api/orders/purchase/' + orderId)
        .then( response => response.data)
    },
    updatedStatusForOrder: function (orderId, status){
      return $http.put('/api/orders/status/' + orderId + '/' + status)
        .then( response => response.data)
    },
    deleteOrder: function (orderId){
      return $http.delete('/api/orders/' + orderId)
        .then( response => response.data)
    },
    deleteOrderForUser: function (orderId, userId){
      return $http.delete('/api/orders/' + orderId + '/' + userId)
        .then( response => response.data)
    }

  }
})
