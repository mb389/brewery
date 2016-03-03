app.factory('OrderFactory', function ($http){

  return {
    getAllOrders: function (){
      return $http.get('/api/orders/')
        .then( response => {
            return response.data;
        })
    },
    getOrderById: function (orderId){
      return $http.get('/api/orders/' + orderId)
        .then( response => {
          return response.data;
        })
    },
    getOrderBySessionId: function (sessionId){
      return $http.get('/api/orders/session/' + sessionId)
        .then( response => {
          return response.data;
        })
    },
    updateOrAddProductToOrder: function (orderId, productToAdd){
      return $http.put('/api/orders/add/' + orderId, productToAdd)
        .then( response => {
          return response.data;
        })
    },
    updateOrCreateOrderAndAddProduct: function (productToAdd){
      return $http.post('/api/orders/add', productToAdd)
        .then( response => {
          return response.data;
        })
    },
    editProductForOrder: function (orderId){
      return $http.put('/api/orders/purchase/' + orderId)
        .then( response => {
          return response.data;
        })
    },
    updatedStatusForOrder: function (orderId, status){
      return $http.put('/api/orders/' + orderId + '/' + status)
        .then( response => {
          return response.data;
        })
    },
    deleteOrder: function (orderId){
      return $http.delete('/api/orders/' + orderId)
        .then(response => {
          return response.data;
        })
    },
    deleteOrderForUser: function (orderId, userId){
      return $http.delete('/api/orders/' + orderId + '/' + userId)
        .then(response => {
          return response.data;
        })
    }

  }
})
