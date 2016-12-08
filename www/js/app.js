// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngCordova','angularMoment']);

app.run(function($ionicPlatform,$state,$rootScope,$ionicPopup,$cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {

        try {
          $cordovaStatusbar.overlaysWebView(true);
          $cordovaStatusbar.style(0);
          $cordovaStatusbar.styleHex('#387ef5');
        } catch (e) {
          console.log(e);
        }
    }


    try {
      var notificationOpenedCallback = function(jsonData) {
        console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
        if(!jsonData){
            return;
        }

        if(jsonData.isActive===false)
        {
          $state.go('app.events');
        }
        else {
            $rootScope.showDialog("<font color='green' style='font-weight: bold;'>EVENT NOTIFICATION!</font>","Please checkout events section for new Event.");
        }

      };



      window.plugins.OneSignal.init("c9334183-ce9d-4e60-8bb4-ac59427c403c",
                                     {googleProjectNumber: "277393171415",
                                     autoRegister: true},
                                     notificationOpenedCallback);


    }
    catch(err)
    {
      console.log("Exception:",err);
    }


  });

  //-----------------------------------------
  //  ALERT DIALOG
  //------------------------------------------
  // An alert dialog
  $rootScope.showDialog = function(title,msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: "<center>"+msg+"</center>"
    });
    alertPopup.then(function(res) {
      // console.log('Thank you for not eating my delicious ice cream cone');
    });
  };
  //--------------------------------------

});
app.run(function($rootScope, $ionicLoading) {
    $rootScope.$on('loading:show', function() {
      $ionicLoading.show({template: '<ion-spinner class="spinner-positive"></ion-spinner>'})
    })
    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide()
    })
});


//Testing this LoadingBar
app.config(function($httpProvider) {

    $httpProvider.interceptors.push(function($rootScope) {
      return {
        request: function(config) {
          $rootScope.$broadcast('loading:show')
          return config
        },
        response: function(response) {
          $rootScope.$broadcast('loading:hide')
          return response
        }
      }
    })
});
app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {


    $urlRouterProvider.otherwise('/app/home')

    $stateProvider
    .state('app', {
        url: '/app',
        cache: false,
        abstract: true,
        templateUrl: 'templates/menu.tpl.html',
        controller: 'MenuController'
    })
    .state('app.home', {
        url: '/home',
        cache: 'false',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.tpl.html',
            controller: 'HomeController'
          }
        },
    })
    .state('app.events', {
        url: '/events',
        cache: 'false',
        views: {
          'menuContent': {
            templateUrl: 'templates/events.tpl.html',
            controller: 'EventController'
          }
        },
    })
    .state('app.facebook', {
        url: '/facebook',
        cache: 'false',
        views: {
          'menuContent': {
            templateUrl: 'templates/facebook.tpl.html',
            controller: 'FacebookController'
          }
        },
    })
    .state('app.contactus', {
        url: '/contactus',
        cache: 'false',
        views: {
          'menuContent': {
            templateUrl: 'templates/contactus.tpl.html',
            controller: 'ContactUsController'
          }
        },
    })
    .state('app.ourwork', {
        url: '/ourwork',
        cache: 'false',
        views: {
          'menuContent': {
            templateUrl: 'templates/ourwork.tpl.html',
            controller: 'OurWorkController'
          }
        },
    })
    .state('app.ourcamp', {
        url: '/ourcamp',
        cache: 'false',
        views: {
          'menuContent': {
            templateUrl: 'templates/ourcamp.tpl.html',
            controller: 'OurCampController'
          }
        },
    });
});

// app.constant('REST_BASE_URL','http://192.168.0.101/cvc/api/');
// app.constant('FILE_BASE_URL','http://192.168.0.101/cvc/app/webroot/files/');

app.constant('REST_BASE_URL','http://sufyan.co.in/cvc/api/');
app.constant('FILE_BASE_URL','http://sufyan.co.in/cvc/app/webroot/files/');
app.constant('APP_VERSION','1.0.6');
app.constant('ACCESS_TOKEN','EAACBSsPOPNEBAFXHUd9C9vfeebm9nZBQhtvyfLNgMlpKhuxLIy1K3edNCco0WyLtetfBJ5bUQD3uhR3fZCfMMxTXevVbkmAxZB52U5Tr3Ppixqe8PkfX97A8Med4298FYJbJ7Y5OrOiI60JuieyAZCZAQ5uE8rpwZD');
// app.constant('ACCESS_TOKEN','EAACBSsPOPNEBAGKj6FO1bjsqRfPN0U4QOC6vkG9hjYqjvsVNqZCC6IaZCRwGgJZCzIzCzhkogzZBmPiyOc0ymsD11yyigvbjzZCxwt8PitjOx4TVZCSwZBNtvMMg9ZA50Fq7z7HdFkVpujXSiEBZCfT0Gud6WOpKhRioZD');
