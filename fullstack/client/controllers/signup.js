var app = angular.module('MyApp');
app.controller('SignupCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.signup = function() {
    Auth.signup({
      email: $scope.email,
      password: $scope.password
    });
  };
}]);
