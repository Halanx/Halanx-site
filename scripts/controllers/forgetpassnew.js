'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:ForgetpassnewCtrl
 * @description
 * # ForgetpassnewCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('ForgetpassnewCtrl', function ($scope,forgetpassnew) {
        $scope.submitform = ()=>{
    
        var obj = {};
        
        obj.new_password1=$scope.newpass;
        obj.new_password2= $scope.cpass;
        
         
        console.log(obj)
       
          var promise = forgetpassnew.callserver(obj);
          promise.then((data)=>
          {
          console.log(data);
          if(data.key){
              alert("Password Reset!");
          }
          },(err)=>{
          alert("error");
          })
       
    }
  });
