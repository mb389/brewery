app.controller('AdminUserController', function($scope, ProductFactory, OrderFactory, AdminFactory, UserFactory, users) {
  $scope.users = users;

  $scope.deleteUser = function(userId) {
    UserFactory.deleteUser(userId)
    .then(() => {
      $scope.users = $scope.users.filter(user => {
        if (user._id !== userId) return true;
      })
    })
  }

  $scope.checkUserStatus = function (user, type) {
    switch(type) {
      case 'admin':
        return user.isAdmin ? true : false;
      case 'owner':
        return user.isOwner ? true : false;
      case 'regular':
        return user.isOwner || user.isAdmin ? false : true;
      default:
        true;
    }
  }

  $scope.changeRole = function(user, type) {
    switch(type){
      case 'admin':
         user.isAdmin = true;
         break;
      case 'owner':
        user.isOwner = true;
        break;
      case 'regular':
        user.isAdmin = false;
        user.isOwner = false;
        break;
    }
    UserFactory.editExistingUser(user._id, user)
     .then(updatedUser => {
      $scope.users = $scope.users.map(usr => {
        if(usr._id === updatedUser._id) return updatedUser;
        return usr
      })
     })
  }

});
