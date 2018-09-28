'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('angularTraining').
  component('welcome', {
    templateUrl: 'welcome/welcome.template.html',
    controller: ['$routeParams', 
      function welcomeController($routeParams) {
        var self = this;
      }
    ]
  });