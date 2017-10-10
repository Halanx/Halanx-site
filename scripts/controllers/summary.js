'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:SummaryCtrl
 * @description
 * # SummaryCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('SummaryCtrl', function ($scope,summary,$window) {
     if(localStorage.getItem("isLogin") === null || JSON.parse(localStorage.getItem("isLogin"))==false){
     $window.location.href = "#login";
    }
         if(localStorage.token){
//     ordersummary();
//      }
//     function ordersummary(){
       var mobilenumber = localStorage.getItem("mobilenumber");
                  
                    var token = summary.gettoken();
                    var promise = summary.bill(token)
                          promise.then(function(data){
                    console.log(data);
                    var totalwithex = parseInt(localStorage.getItem("amount"))+parseInt(data.DeliveryCharges)+ parseInt(localStorage.getItem("tax"));
                     $scope.cost = {
                  Total:localStorage.getItem("amount"),
                  DeliveryCharges:data.DeliveryCharges,
                  Taxes:localStorage.getItem("tax"),
                  TotalWithExtras:totalwithex
            }
                              // $scope.cost = data;
                              // var amount= data.TotalWithExtras;
                              // localStorage.setItem('amount',amount);
      },function(err){
  
    } );
       
    }
  });
