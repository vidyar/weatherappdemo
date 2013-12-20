var appControllers = angular.module('appControllers', []);

appControllers.controller('GithubController',function($scope) {
  $scope.data = 'Before click';
  $scope.findUser = function() {
   console.log('here');
   $scope.data = 'Clicked';
  }
});
