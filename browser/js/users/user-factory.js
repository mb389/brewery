app.factory('UserFactory', function ($http){

  return {
    getAllUsers: function (){
      return $http.get('/api/users/')
        .then(response => {
          return response.data;
        })
    },
    getUserById: function (userId) {
      return $http.get('/api/users/' + userId)
        .then(response => {
          return response.data;
        })
    },
    getOrderForUser: function (userId){
      return $http.get('/api/users/' + userId + '/orders')
        .then(response => {
          return response.data;
        })
    },
    getPendingOrderForUser: function (userId){
      return $http.get('/api/users/' + userId + '/orders/pending')
        .then(response =>{
          return response.data;
        })
    },
    checkAdminStatus: function (userId) {
      return $http.get('/api/users/' + userId + '/isAdmin')
        .then(response => {
          return response.data;
        })
    },
    createUser: function (newUser) {
      return $http.post('/api/users/', newUser)
        .then(response => {
          return response.data;
        })
    },
    editExistingUser: function (userId, editedUser){
      return $http.put('/api/users/' + userId, editedUser)
        .then(response => {
          return response.data;
        })
    },
    deleteUser: function (userId){
      return $http.delete('/api/users/' + userId)
        .then(response => {
          return response.data;
        })
    },
    deletePassword: function(userId) {
      return $http.delete('/api/users/password_reset/' + userId)
        .then(response => {
          return response.data;
        })
    }
  }
});
