'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:OrdersCtrl
 * @description
 * # OrdersCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('OrdersCtrl', function ($scope,orders) {

    $scope.menu = false;
    $scope.movex = true;

    $scope.addsidebar = ()=>{
        $scope.movex = !$scope.movex;
    }

    $scope.closeTrack = ()=> {
        $scope.trackToggle = false;
    }

    $scope.trackToggle = false;
    $scope.toggleDeliver = true;
    $scope.toggleOnGo = true;
    $scope.toggleRec = true;

    $scope.trackyourOrder = (order)=>{
        $scope.trackToggle = true;
        $scope.toggleDeliver = true;
        $scope.toggleOnGo = true;
        $scope.toggleRec = true;
        let orderId = order.id;
        let token = orders.gettoken();
        $scope.trackOrder = "";

       var promise =  orders.trackOrder(token,orderId);
                     
            promise.then(function(data){
                console.log("mere func k andr");
        console.log(data[0]);

        if(data=="") {
            $scope.toggleRec = false;
            $scope.trackStatus = "Order Recieved";
        } else {
            if(data[0].IsDelivered==true) {
                console.log("delivered");
                $scope.trackStatus = "Order Delivered";
                $scope.delby = ((data[0].ShopperId).user).first_name +" "+ ((data[0].ShopperId).user).last_name;
                $scope.orderItems = data[0].items;
                $scope.shopperMo = (data[0].ShopperId).PhoneNo;
                $scope.toggleDeliver = false;
            }else if(data[0].IsDelivered==false) {
                console.log("ongoing");
                $scope.trackStatus = "On Going";
                $scope.toggleOnGo = false;
            }
        }
      },function(err){
  
    } ); 

    }  

    $scope.myorder = (check)=>{
        if(localStorage.token){
            let token = orders.gettoken();
       
        var promise = orders.getorderon(token);
        
        if(check=="ongoing"){
             
            promise.then(function(data){
        console.log(data);
             var filterdata = data.filter((obj)=>{
                            return obj.IsDelivered == false;
                            });
             console.log(filterdata)
        $scope.orders = filterdata;
      },function(err){
  
    } ); 
        }
        else if(check=="delivered"){
              
            promise.then(function(data){
        console.log(data);
             var filterdata = data.filter((obj)=>{
                            return obj.IsDelivered == true;
                            });
             console.log(filterdata)
        $scope.orders = filterdata;
      },function(err){
  
    } );
        }
        else{
               promise.then(function(data){
        console.log(data);
             var filterdata = data.filter((obj)=>{
                            return obj.IsDelivered == false;
                            });
             console.log(filterdata)
        $scope.orders = filterdata;
      },function(err){
  
    } )  
        }
        
    }
    }
     $scope.myorder();
  });
