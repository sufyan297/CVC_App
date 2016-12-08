(function(){
	var app = angular.module('starter');

	app.controller('HomeController',function($scope,$state,$ionicLoading,$rootScope)
    {
        console.log("HomeController");

		$scope.goToFB = function()
		{
			var url = "https://www.facebook.com/ChangeVadodara/";
		   window.open(url, '_system', 'location=yes');
		}

		$scope.goToInstagram = function()
		{
			var url = "https://www.instagram.com/changevadodara/";
		   window.open(url, '_system', 'location=yes');
		}

		$scope.goToJoinForm = function()
		{
			var url = "https://docs.google.com/forms/d/1Xrdj1l-ThUPaA2M5J95Mce_CXrczJCGN9v6tXSruzC0/viewform?c=0&w=1";
		   window.open(url, '_system', 'location=yes');
		}
    });
})();
