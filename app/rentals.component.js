/**
* @ngdoc Component
* @name rentals.component.js
* @author Vineetha Nadimpalli <vinnadimpalli@deloitte.com>
* @description Rental component with controller to initialize data and call various services to perform various rental functions
**/


"use strict";

//create rental controller
var RentalController = function(RentalService) {

    var vm = this;
    //define scope variables
    vm.User = [];
    
    vm.customerRentals=[];

    //call service method to get all rentals data
    RentalService.getData().then(function(response) {

        vm.show = false; 
        vm.rentals = response.data.rentalList;
       

    }
    )
  
    //method to get customer rentals
    vm.getCustRentalData = function() {
        
        //call service method to get all customer rentals data
        RentalService.getDataForCustomer(vm.User.UserName,vm.User.Phone).then(function(response) {
        vm.customerRentals = response.data.rentalList;
        
    })

     //method to issue movie 
     vm.issueMovieFunc = function() {
        vm.returnMessage =null;
        //call service method to issue movie
        RentalService.issueMovie(vm.User.UserName,vm.User.Phone,vm.User.MovieName).then(function(response) {
        vm.getCustRentalData();
        vm.issueMessage = response.data.message;
      })
    }

    vm.returnMovieFunc = function() {
        vm.issueMessage = null;
        //call service method to return movie
        RentalService.returnMovie(vm.User.RID).then(function(response) {
        vm.getCustRentalData();
        vm.returnMessage = response.data.message;
        

        RentalService.getData().then(function(response) {
            vm.rentals = response.data.rentalList;
            
        })
      })

    }
    }
};


// Add controller to the global list
controllers.RentalController = RentalController;

