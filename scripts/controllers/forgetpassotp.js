'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:ForgetpassotpCtrl
 * @description
 * # ForgetpassotpCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('ForgetpassotpCtrl', function ($scope,forgetpassotp) {
      
    $scope.submitform = ()=>{
    
        var obj = {};
        
        obj.password= $scope.otp;
        obj.username= "c" + $scope.mobilenumber;
        
         
        console.log(obj)
       
          var promise = forgetpassotp.callserver(obj);
          promise.then((data)=>
          {
          console.log(data);
          if(data.key){
              $window.location.href="https://www.halanx.com/halanx-final/new1big-kfc/frontpage/forgotpass2.html";
          }
          },(err)=>{
          alert("error");
          })
       
    }
  });
