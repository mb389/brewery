app.controller('AdminController', function($scope, AuthService, user) {
  $scope.user = user
  console.log(user)
});
