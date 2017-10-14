'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:FoodmainCtrl
 * @description
 * # FoodmainCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('FoodmainCtrl', function ($scope,foodmain,$window) {
     if((localStorage.getItem("isLogin") === null || JSON.parse(localStorage.getItem("isLogin"))==false)&&(localStorage.getItem("isLocated")==null || localStorage.getItem("isLocated")==false)){
     $window.location.href = "#login";
    }
    
     $scope.showclass = false;
   $scope.movex = true;
    $scope.menu = false;
    if(localStorage.storedata){
 foodmain.loaddata()
    }
   
   $scope.counter= foodmain.loadcounter();
   console.log($scope.counter);
    $scope.mystore= function(id){
         foodmain.saveid(id);
        var promise =  foodmain.productserver(id);
         promise.then(function(data){
        console.log(data)


       $scope.mydata = data;
             favdata();
       
      },function(err){
        // alert("err");   
    } )
         datalogo(id);
     }
    load_id();
     getdata();
      function favdata(){
//       var token= foodmain.gettoken();
//        console.log(token)
//        if(token==null){
//            console.log("null")
//        }
       
        if(localStorage.token){
             var token= foodmain.gettoken();
            console.log(token)
          var promise =  foodmain.favproduct(token);
         promise.then(function(data){
        console.log(data)
         console.log("food")
 for(var i=0;i<data.length;i++){
  for(var j=0;j<$scope.mydata.length;j++){
      if(data[i].id==$scope.mydata[j].id){
          $scope.mydata[j].FavoriteField = true;
          
      }
     
  }
 }
      },function(err){
        // alert("err");   
    } ) 
        }
        else{
            console.log("hello")
        }
    }
    
    function fav(){
        if(localStorage.mobilenumber==null){
            $scope.fav = true;
        }
        else{
           $scope.fav = false; 
        }
    }
//    $scope.mydata = foodmaintory.load(); 
   
function load_id(){
    var id = foodmain.load();
    console.log(id)
   $scope.mystore(id);
    
}
  
    function getdata(){
          if(localStorage.token==null){
            $scope.menu=true;
             console.log("no")
        }
        else{
               $scope.menu=false;
             console.log("yes")
        }
    var promise = foodmain.callserver();
    promise.then(function(data){
        console.log(data)
       $scope.storedata = data;
      

        console.log($scope.storedata);
      },function(err){
        // alert("err");   
    } );
    }
      
    $scope.addsidebar = ()=>{
        $scope.movex = !$scope.movex;
    }
$scope.addstore = ()=>{
    $scope.showclass = !$scope.showclass;
    
}
    

     $scope.addmodal = (data)=>{
         $scope.modal = data;
     }
 
     
     
     
     function datalogo(id){
           var promise = foodmain.storeserver(id);
    promise.then(function(data){
        console.log(data)
       $scope.StoreLogo = data.StoreLogo;
        $scope.StoreName= data.StoreName;
        //$scope.productcat = JSON.parse(data.CategoriesAvailable);
        $scope.productcat=data.CategoriesAvailable;
      },function(err){
        // alert("err");   
    } );
     }
         
    $scope.addtocart = (modal, quantity)=>{
//       var len = foodmain.arrlength();
//        console.log(len)
//        if(len==0){
//             foodmain.addproduct(modal)
//        }
        
//        else{
       var match =  foodmain.check(modal)
   
       if(match.length==1){
        //   alert("already present in cart")
       }
        else{
        
        modal.quantity = quantity;
        console.log("modal wala: " +  modal.quantity);
         foodmain.addproduct(modal)
       
        $scope.counter = foodmain.arrlength();
            foodmain.savecounter($scope.counter)
         Notification.requestPermission(function(){
            var n = new Notification("Halanx", {
                body : "ADDED TO CART",
                icon : "images/success.png"
            });
           },1000);
        }

        
        
    }
    $scope.addfav = (data)=>{
        // alert("Added to Favourites!");
        var val;
        data.FavoriteField = !data.FavoriteField;
         var token=foodmain.gettoken();
        if(data.FavoriteField==true){
            val = 1;
//            alert("true")
            
       var obj= {}
       obj.LastItem = data.id;
            
            console.log(obj.LastItem)
//            var mobilenumber=localStorage.getItem("mobilenumber")
          
            
      var promise =   foodmain.callfav(obj,val,token)
                 promise.then(function(data){
        console.log(data)


       
       
      },function(err){
        // alert("err");   
    } )
 
        }
        else{
            
              val = 0;
//            alert("true")
            
       var obj= {}
       obj.LastItem = data.id;
           
            console.log(obj.LastItem)
           
          
            
      var promise =   foodmain.callfav(obj,val,token)
                 promise.then(function(data){
        console.log(data)


       
       
      },function(err){
        // alert("err");   
    } )  
            
            
        }
    }
     
     $scope.minus = ()=>{
      $scope.quantity = $scope.quantity - 1  
     }
    $scope.plus = ()=>{
        console.log($scope.quantity)
        $scope.quantity = $scope.quantity + 1
    }
     
     $scope.search = ()=>{
         console.log("hello")
        console.log($scope.store)
       var promise =  foodmain.searchlist($scope.enter)
           promise.then(function(data){
        console.log(data);
               
              $scope.listdata = data;
               console.log($scope.list)
      
      },function(err){
  
    } );
    }
     $scope.getsearch = (product)=>{
         console.log(product._source.Id)
         console.log($scope.mydata)
       var filterdata = $scope.mydata.filter(function(obj){
            return obj.id == product._source.Id
        })
       console.log(filterdata)
     $scope.addmodal(filterdata[0])
     }
       function jquery(){
                            $(".category").click(function(){
           if($('.category').hasClass('colorred')){
   $('.category').removeClass('colorred')
}
    $(this).addClass("colorred");
                 console.log( $(this).text().trim())
});
//         alert("hello")
     }
    
    
     $scope.catwise = (cat)=>{
        
  jquery();
         
         console.log(foodmain.load())
             var promise =  foodmain.productserver(foodmain.load());
         promise.then(function(data){
        console.log(data)

         if(cat=="All"){
            $scope.mydata = data; 
         }
             else{
        var owncat =  data.filter(function(obj){
             return obj.Category ==cat;
         })
        console.log(owncat)
        $scope.mydata = owncat;
//       $scope.mydata = data;
          
             }
      },function(err){
        // alert("err");   
    } )
     }
    
  });
