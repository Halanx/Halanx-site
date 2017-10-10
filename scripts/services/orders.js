'use strict';

/**
 * @ngdoc service
 * @name halanxApp.orders
 * @description
 * # orders
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('orders', function ($http,$q) {
     var object = {
        getorderon : function(key){
                  
              var pr = $q.defer();
         var url = "https://api.halanx.com/orders/user";
        
                
         $http.get(url, {
//                withCredentials: true,
                headers: {
                    'Authorization': 'Token ' + key 
                }
            }).then(function(data){
             pr.resolve(data.data)
             console.log("success")
        
         },
                             function(err){
             pr.reject(err)
             console.log("error")
             
         }
         )
         return pr.promise
        },
         gettoken : function(){
         var token = localStorage.getItem("token");
         
          return token; 
        },

        trackOrder : function(key,orderid){
                  
              var pr = $q.defer();
         var url = "https://api.halanx.com/orders/"+orderid+"/track/";
                
         $http.get(url, {
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': 'Token ' + key 
                }
            }).then(function(data){
             pr.resolve(data.data)
             console.log("success")
        
         },
          function(err){
             pr.reject(err)
             console.log("error")
             
         }
         )
         return pr.promise
        }
    }
    return object;
  });
