'use strict';

var controllers = {}
var services = {}

var myApp = angular.module('angularTraining',['ngRoute','ngMessages']);

myApp.config(function($routeProvider) {
  $routeProvider.
        when('/rentals', {
          controller: 'RentalController',
          templateUrl: 'rentals/rentals.template.html'
        }).
        when('/movies', {
          controller: 'MoviesController',
          templateUrl: 'movies/movies.component.html'
        }).
        otherwise('/rentals');
});

myApp.service(services);
myApp.controller(controllers);