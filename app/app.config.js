'use strict';

angular.
  module('angularTraining').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/welcome', {
          template: '<welcome></welcome>'
        }).
        otherwise('/welcome');
    }
  ]);