app.config(function ($stateProvider) {
    $stateProvider.state('signup', {
        url:'/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
      });
})

app.controller('SignupCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;
    $scope.storeOwner = false;

    $scope.toggleStoreOwner = function (){
      $scope.storeOwner = !$scope.storeOwner;
    }

    $scope.sendSignup = function (signupInfo) {
      console.log('runs signup');

        $scope.error = null;

        AuthService.signup(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid signup credentials.';
        });

    };

});
