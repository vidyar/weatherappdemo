var app = angular.module('app', [
  'ngRoute',
  'appControllers'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/github.html',
        controller: 'GithubController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
