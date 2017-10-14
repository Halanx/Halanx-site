'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:OrdersCtrl
 * @description
 * # OrdersCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('OrdersCtrl', function ($scope,orders,$window) {
       if(localStorage.getItem("isLogin") === null || JSON.parse(localStorage.getItem("isLogin"))==false){
     $window.location.href = "#login";
    }
    if(localStorage.getItem("storedata")!=null){
            var counter_length = JSON.parse(localStorage.getItem("storedata")).length;
            $scope.counter = counter_length
        }
        else{
            $scope.counter = 0;
        }
    $scope.rev = true;
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
            if(data[0].IsDelivered==false) {
                console.log("delivered");
                $scope.trackStatus = "On Going";
                $scope.delby = ((data[0].ShopperId).user).first_name +" "+ ((data[0].ShopperId).user).last_name;
                $scope.orderItems = data[0].items;
                $scope.shopperMo = (data[0].ShopperId).PhoneNo;
                $scope.toggleOnGo = false;
            }else if(data[0].IsDelivered==true) {
                console.log("ongoing");
                $scope.trackStatus = "Order Delivered";
                $scope.toggleDeliver = false;
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
            $scope.noongo=false;
             var filterdata = [];
             var k=0;
            promise.then(function(data){
        console.log(data);
                for(var i=0;i<data.length;i++){
                     for(var j=0;j<data[i].order_items.length;j++){
                          if(data[i].order_items[j].IsDelivered==false){
                            //   console.log(data[i]);
                              filterdata[k] = data[i];
                              k++;
                              break;
                                }  
                                    }
                                         }
            //  var filterdata = data.filter((obj)=>{
            //                 return obj.IsDelivered == true;
            //                 });
             console.log(filterdata)
        $scope.orders = filterdata;
        if(filterdata=="") {
            $scope.noongo=true;
            $scope.orderStat = "You have no ongoing orders. Please order."
        }
      },function(err){
  
    } ); 
        }
        else if(check=="delivered"){
             var filterdata1 = [];
             var m=0;
             $scope.noongo=false;
            promise.then(function(data){
        console.log(data);
        for(var i=0;i<data.length;i++){
                     for(var j=0;j<data[i].order_items.length;j++){
                          if(data[i].order_items[j].IsDelivered==true){
                            //   console.log(data[i]);
                              filterdata1[m] = data[i];
                              m++;
                              break;
                                }  
                                    }
                                         }
            //  var filterdata = data.filter((obj)=>{
            //                 return obj.IsDelivered == false;
            //                 });
             console.log(filterdata1)
        $scope.orders = filterdata1;
        if(filterdata1=="") {
        $scope.noongo=true;
        $scope.orderStat = "You have no delivered orders."
    }
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
    if(filterdata=="") {
        $scope.noongo=true;
        $scope.orderStat = "You have no delivered orders."
    }
        }
        
    }
    }
     $scope.myorder();
  });
