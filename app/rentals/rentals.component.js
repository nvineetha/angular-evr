/*
 * Created by Vineetha Nadimpalli
 * 
*/

"use strict";

//create rental controller
var RentalController = function($scope,RentalService) {

    //define scope variables
    $scope.User = [];
    $scope.rentals = [];

    //call service method to get all rentals data
    RentalService.getData().then(function(response) {

        $scope.show = false; 
        $scope.rentals = response.data.rentalList;

    }
    )
  
    //method to get customer rentals
    $scope.getCustRentalData = function() {
        $scope.customerRentals=[]
        //call service method to get all customer rentals data
        RentalService.getDataForCustomer($scope.User.UserName,$scope.User.Phone).then(function(response) {
        $scope.customerRentals = response.data.rentalList;
        console.log($scope.customerRentals);
    })

     //method to issue movie 
    $scope.issueMovieFunc = function() {
        $scope.returnMessage =null;
        //call service method to issue movie
        RentalService.issueMovie($scope.User.UserName,$scope.User.Phone,$scope.User.MovieName).then(function(response) {
        $scope.getCustRentalData();
        $scope.issueMessage = response.data.message;
      })
    }

    $scope.returnMovieFunc = function() {
        $scope.issueMessage = null;
        //call service method to return movie
        RentalService.returnMovie($scope.User.RID).then(function(response) {
        $scope.getCustRentalData();
        $scope.returnMessage = response.data.message;
        

        RentalService.getData().then(function(response) {
            $scope.rentals = response.data.rentalList;
            
        })
      })

    }
    }
};


// Add controller to the global list
controllers.RentalController = RentalController;

//create rental service
var RentalService = function($http, $rootScope) {

    // GET Request to fetch the rental records
    this.getData = function() {
        return $http({
          method: "GET",
          url: "https://ap4.salesforce.com/services/apexrest/Rental/getAllRentals",
          headers: {
            Authorization:
            "OAuth 00D6F000002VGKX!AQsAQMA1eeRWdV0nOF8otNW9vX6k35.6vR.ulkvNwBOFvfrBDlm6y.mj7xQhzO7Ap_i4YSEYdJChBybQSfGwkqn2SSLGdfsJ"
          }
        })
        .success(function(data) {
            return data;
        })
        .error(function() {
            return null;
        });
    }

    // GET Request to fetch the customer rentals records
    this.getDataForCustomer = function(UserName,Phone) {
        return $http({
          method: "GET",
          url: "https://ap4.salesforce.com/services/apexrest/Rental/" +  UserName + "/" +  Phone +"/movieList",
          headers: {
            Authorization:
            "OAuth 00D6F000002VGKX!AQsAQMA1eeRWdV0nOF8otNW9vX6k35.6vR.ulkvNwBOFvfrBDlm6y.mj7xQhzO7Ap_i4YSEYdJChBybQSfGwkqn2SSLGdfsJ"
        }
        })
        .success(function(data) {
            return data;
        })
        .error(function() {
            return null;
        });

    }

    //POST request to issue a movie
    this.issueMovie = function(userName,phone,movieName) {
        return $http({
          method: "POST",
          url: "https://ap4.salesforce.com/services/apexrest/Rental/issueMovie",
          data: {
          "movieName":movieName,
          "phone":phone,
          "userName":userName
          },
          headers: {
            Authorization:
            "OAuth 00D6F000002VGKX!AQsAQMA1eeRWdV0nOF8otNW9vX6k35.6vR.ulkvNwBOFvfrBDlm6y.mj7xQhzO7Ap_i4YSEYdJChBybQSfGwkqn2SSLGdfsJ",
            "Content-Type": "application/json"
          }
        })
        .success(function(data) {
             return data;
        })
        .error(function() {
             return null;
        });
    }

    this.returnMovie = function(rid) {
        return $http({
          method: "POST",
          url: "https://ap4.salesforce.com/services/apexrest/Rental/returnMovie",
          data: {
          "rid":rid
          },
          headers: {
            Authorization:
            "OAuth 00D6F000002VGKX!AQsAQMA1eeRWdV0nOF8otNW9vX6k35.6vR.ulkvNwBOFvfrBDlm6y.mj7xQhzO7Ap_i4YSEYdJChBybQSfGwkqn2SSLGdfsJ",
            "Content-Type": "application/json"
          }
        })
        .success(function(data) {
           return data;
        })
        .error(function() {
           return null;
        });
    };

};

// Register service to the global list
services.RentalService = RentalService;

