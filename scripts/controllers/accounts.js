'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:AccountsCtrl
 * @description
 * # AccountsCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('AccountsCtrl', function ($scope,accounts) {
         userinfo();
    function userinfo()
    {
   var token = accounts.gettoken();
        
    var promise = accounts.info(token);
    promise.then(function(data){
    console.log(data);
    console.log(data.FirstName)
    $scope.FirstName = data.user.first_name;
    localStorage.setItem('firstname',$scope.FirstName);
    $scope.LastName = data.user.last_name;
    $scope.EmailId = data.user.email;
    localStorage.setItem('email',$scope.EmailId);
    $scope.Phoneno = data.PhoneNo;
    localStorage.setItem('mobilenumber',$scope.Phoneno);
    $scope.password = data.password
    }
      ,function(err){
        alert("err");   
    } 
    )
}
    $scope.hello = "hello"
  });
