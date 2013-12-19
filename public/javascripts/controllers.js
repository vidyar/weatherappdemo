var appControllers = angular.module('appControllers', []);

appControllers.controller('GithubController',function($scope) {
  $scope.data = 'Test from client';
});
