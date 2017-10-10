'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:LandingCtrl
 * @description
 * # LandingCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('LandingCtrl', function ($scope,landing) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    storename();

    $scope.movex = true;

    $scope.addsidebar = ()=>{
        $scope.movex = !$scope.movex;
    }

    function storename()
    {
        var promise = landing.callserver();
    promise.then(function(data){
        console.log(data)
        var Food  = data.filter(function(obj){
            return obj.StoreCategory == "Food" && obj.Verified == true;
        })
        var Grocery  = data.filter(function(obj){
            return obj.StoreCategory == "Grocery" && obj.Verified == true;
        })
       $scope.stores = Food;
         $scope.grocery= Grocery;
        console.log($scope.stores)
      },function(err){
        alert("err");   
    } );
    }
    // console.log(store);
    $scope.select=(store)=>{
        // console.log("store id is:",store.id)
        landing.save(store.id)
    }
    
  $scope.storelist = ()=>{
        console.log($scope.store)
       var promise =  landing.storelist($scope.store)
           promise.then(function(data){
        console.log(data);
               $scope.list = data;
               
               console.log($scope.list)
//               for( i=0;i<$scope.list.length;i++){
//                  console.log($scope.list[i].source)
//               }
      
      },function(err){
//        alert("err");   
    } );
    }
    $scope.checkstore = (store)=>{
          landing.save(store._source.Id)
          
        console.log(store._source.Id)
       if(store._source.StoreCategory=="Food"){
            
             window.location = "#/food"
        }
        else if(store._source.StoreCategory=="Grocery"){
            window.location = "#/foodmain"
        }
    }
  });
