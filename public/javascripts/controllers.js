var appControllers = angular.module('appControllers', []);

appControllers.controller('GithubController',function($scope,$http) {
  //$scope.data = 'Before click';
  $scope.searchTerm='';
  $scope.findUser = function() {
   console.log($scope.searchTerm);
   $http.defaults.useXDomain = true;
   //Make github call
   $http.get('https://api.github.com/users/'+$scope.searchTerm).success(function(data) {
    $scope.data = data;
   }).error(function(data) {
     $scope.data = 'Something went wrong or invalid input';
   });
  }
});
