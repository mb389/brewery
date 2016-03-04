app.factory('OrderFactory', function ($http, AuthFactory){

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
    getOrderByUserIdOrSessionId: function (userId) {
      return $http.get('/api/orders/user/session/' + userId)
        .then(response => {
            return response.data;
        })
    },
    getOrderBySessionId: function (){
      return $http.get('/api/orders/session/')
        .then( response => {
          return response.data;
        })
    },
    addOrCreate: function(productToAdd) {
      AuthService.getLoggedInUser()
      .then(function (user){
        if(!user) return $http.get('/api/orders/session/') //get order by session
        else return $http.get('/api/orders/user/session/' + user.id) //get order by user
      })
      .then(function (order){
        if(order) this.updateOrAddProductToOrder (order.id, productToAdd.id);
        else createOrderAndAddProduct (productToAdd.id);
      })
    },
    updateOrAddProductToOrder: function (orderId, productToAdd){
      return $http.put('/api/orders/' + orderId, productToAdd)
        .then( response => {
          return response.data;
        })
    },
    createOrderAndAddProduct: function (productToAdd){
      return $http.post('/api/orders/', productToAdd)
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
