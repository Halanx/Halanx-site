'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:FoodCtrl
 * @description
 * # FoodCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('FoodCtrl', function ($scope,food,$window) {
       if((localStorage.getItem("isLogin") === null || JSON.parse(localStorage.getItem("isLogin"))==false)&&(localStorage.getItem("isLocated")==null || localStorage.getItem("isLocated")==false)){
     $window.location.href = "#login";
    }
    //  $scope.$watch(function(){return $scope.mystore}, function (newValue, oldValue) {
         
    //        if(newValue!=oldValue){
    //          food1=$scope.mystore;
    //        }
           
          
    //     }, true);
    var food1 = [];
    console.log(food.msg);
     $scope.showclass = false;
    $scope.menu = false;
   $scope.movex = true;
    $scope.color = false;
    if(localStorage.storedata){
 food.loaddata()
    }
   
   $scope.counter= food.loadcounter();
   console.log($scope.counter);
    
     $scope.mystore= function(id){
         food.saveid(id);
        var promise =  food.productserver(id);
         promise.then(function(data){
        console.log(data)

        // food1=data;
       $scope.mydata = data;
             favdata()
       
      },function(err){
        // alert("err");   
    } )
         datalogo(id);
     }
    load_id();
     getdata();
    function favdata(){
//       var token= food.gettoken();
//        console.log(token)
//        if(token==null){
//            console.log("null")
//        }
       
        if(localStorage.token){
             var token= food.gettoken();
            console.log(token)
          var promise =  food.favproduct(token);
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
        if(localStorage.token==null){
            $scope.fav = true;
            
        }
        else{
           $scope.fav = false; 
           
        }
    }
//    $scope.mydata = food.load(); 
   
function load_id(){
    var id = food.load();
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
    var promise = food.callserver();
    promise.then(function(data){
        console.log(data)
        
        var Food  = data.filter(function(obj){
            return obj.StoreCategory == "Food";
        })
       $scope.storedata =Food ;
      

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

$scope.scrollDown = function(){
    console.log("aaya");
	    $('html, body').animate({ scrollTop: $("#product-list-wrapper").offset().top - 170 }, 550);
	}
    

     $scope.addmodal = (data)=>{
         $scope.modal = data;
     }
 
     
     
     
     function datalogo(id){
           var promise = food.storeserver(id);
    promise.then(function(data){
        console.log(data)
         $scope.productcat=data.CategoriesAvailable;
        console.log($scope.productcat)
       $scope.StoreLogo = data.StoreLogo;
        $scope.StoreName= data.StoreName
       
      },function(err){
        // alert("err");   
    } );
     }
         
    $scope.addtocart = (modal,q)=>{
//        console.log(q)
//        console.log($scope.counter)
//        console.log($scope.ProductName)
//         console.log(this.quantity)
//       var len = food.arrlength();
//        console.log(len)
//        if(len==0){
//             food.addproduct(modal)
//        }
        
//        else{
       var match =  food.check(modal)
   
       if(match.length==1){
        //   alert("already present in cart")
       }
        else{
        modal.quantity = q;
         food.addproduct(modal)
       
        $scope.counter = food.arrlength();
            food.savecounter($scope.counter)
         Notification.requestPermission(function(){
            var n = new Notification("Halanx", {
                body : "ADDED TO CART",
                icon : "images/success.png"
            });
           },1000);
        }

        
        
    }
    $scope.addfav = (data)=>{
        console.log(data)
         var token=food.gettoken();
        var val;
       data.FavoriteField = !data.FavoriteField;
//        data.FavoriteField = true;
        if(data.FavoriteField==true){
            val = 1;
//            alert("true")
            
       var obj= {}
       obj.LastItem = data.id;
            
            console.log(obj.LastItem)

          
           
      var promise =   food.callfav(obj,val,token)
                 promise.then(function(data){
        console.log(data)


       
       
      },function(err){
        alert("err");   
    } )
 
        }
        else{
            
              val = 0;
//            alert("true")
            
       var obj= {}
       obj.LastItem = data.id;
           
            console.log(obj.LastItem)
//            var mobilenumber = 8506078226;
          
            
      var promise =   food.callfav(obj,val,token)
                 promise.then(function(data){
        console.log(data)


       
       
      },function(err){
        // alert("err");   
    } )  
            
            
        }
    }
    
     $scope.search = ()=>{
         console.log($scope.enter);
        console.log($scope.store);
        
       var promise =  food.searchlist($scope.enter)
           promise.then(function(data){
        console.log(data);
               
              $scope.listdata = data;
               console.log($scope.list)
      
      },function(err){
  
    } );
    }
     $scope.getsearch = (product)=>{
         console.log(product._id);
         console.log($scope.mydata);
         datalogo(product._source.StoreId);
         $scope.mystore(product._source.StoreId);
          food.saveid(product._source.StoreId);
        var promise =  food.productserver(product._source.StoreId);
         promise.then(function(data){
        console.log(data)

        // food1=data;
       var filterdata = data.filter(function(obj){
            return obj.id == product._id;
        });
        $scope.mydata = filterdata;
             favdata()
       
      },function(err){
        // alert("err");   
    } )
        //  datalogo(product._source.StoreId);
        for(var i =0 ; i<50000;i++){
            var count = $scope.mydata.length+1;
        }
         console.log(food1);
       if(product._id!=null||product!=undefined){
           loadNewProd(product._id);    
       }
     };

     function loadNewProd(id){
         console.log($scope.mydata);
        
        
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
         
         
         console.log(food.load())
             var promise =  food.productserver(food.load());
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
