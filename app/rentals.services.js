/**
* @ngdoc Component
* @name rentals.services.js
* @author Vineetha Nadimpalli <vinnadimpalli@deloitte.com>
* @description Rental Component services to call REST APIs to access and modify data from Salesforce backend
**/

//create rental service
var RentalService = function($http, $rootScope) {

    // GET Request to fetch the rental records
    this.getData = function() {
        return $http({
          method: "GET",
          url: "https://ap4.salesforce.com/services/apexrest/Rental/getAllRentals",
          headers: {
            Authorization:
            "OAuth 00D6F000002VGKX!AQsAQK2wObEoD6zvRF3ZS6zPYErQ5e1OPG3ETnkakaxTO2Q3Hje_wBUdDrqSrq5FlgsP2FJDCq8asbbmxaSz3uOXwWunz_GY"
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
            "OAuth 00D6F000002VGKX!AQsAQK2wObEoD6zvRF3ZS6zPYErQ5e1OPG3ETnkakaxTO2Q3Hje_wBUdDrqSrq5FlgsP2FJDCq8asbbmxaSz3uOXwWunz_GY"
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
            "OAuth 00D6F000002VGKX!AQsAQK2wObEoD6zvRF3ZS6zPYErQ5e1OPG3ETnkakaxTO2Q3Hje_wBUdDrqSrq5FlgsP2FJDCq8asbbmxaSz3uOXwWunz_GY",
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
            "OAuth 00D6F000002VGKX!AQsAQK2wObEoD6zvRF3ZS6zPYErQ5e1OPG3ETnkakaxTO2Q3Hje_wBUdDrqSrq5FlgsP2FJDCq8asbbmxaSz3uOXwWunz_GY",
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