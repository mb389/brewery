app.factory('UserFactory', function ($http){

  return {
    getAllUsers: function (){
      return $http.get('/api/users/')
      .then(response => response.data)
    },
    getUserById: function (userId) {
      return $http.get('/api/users/' + userId)
        .then(response => response.data)
    },
    getOrderForUser: function (userId){
      return $http.get('/api/users/' + userId + '/orders')
        .then(response => response.data)
    },
    getPendingOrderForUser: function (userId){
      return $http.get('/api/users/' + userId + '/orders/pending')
        .then(response => response.data)
    },
    checkAdminStatus: function (userId) {
      return $http.get('/api/users/' + userId + '/isAdmin')
        .then(response => response.data)
    },
    createUser: function (newUser) {
      return $http.post('/api/users/', newUser)
        .then(response => response.data)
    },
    editExistingUser: function (userId, editedUser){
      return $http.put('/api/users/' + userId, editedUser)
        .then(response => response.data)
    },
    deleteUser: function (userId){
      return $http.delete('/api/users/' + userId)
        .then(response => response.data)
    },
    deletePassword: function(userId) {
      return $http.delete('/api/users/password_reset/' + userId)
        .then(response => response.data)
    }
  }
});
