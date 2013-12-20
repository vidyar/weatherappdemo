var appControllers = angular.module('appControllers', []);

appControllers.controller('GithubController',function($scope,$http) {
  //$scope.data = 'Before click';
  $scope.searchTerm='';
  $scope.login = '';
  $scope.avatar = '';
  $scope.findUser = function() {
   console.log($scope.searchTerm);
   $http.defaults.useXDomain = true;
   //Make github call
   $http.get('https://api.github.com/users/'+$scope.searchTerm).success(function(data) {
    $scope.data = data;
    $scope.login = data.login;
    $scope.avatar = data.avatar_url;
    console.log($scope.login+' '+$scope.avatar);
   }).error(function(data) {
     console.log('error');
     $scope.data = 'Something went wrong or invalid input';
     $scope.login = '';
     $scope.avatar = '';  
   });
  }
});
