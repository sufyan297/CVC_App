(function(){
	var app = angular.module('starter');

	app.controller('MenuController',function($scope,$state,$ionicLoading,$rootScope,$http,APP_VERSION,REST_BASE_URL,FILE_BASE_URL,$ionicPopup)
    {
        console.log("MenuController");

        // $scope.goToFacebook = function()
        // {
        //     $state.go('app.facebook');
        // }
		$scope.updata = {};
		$scope.checkForUpdate = function()
		{
			// Get Page feed
	        $http({
	          method: 'GET',
	          url: REST_BASE_URL + 'check_for_updates'
	        })
	        .then(function successCallback(response) {
	            console.log("response data: ", response.data);
	            if(response.data.status == 'success')
	            {
					$scope.updata = response.data.data.Appupdate;

					if($scope.updata.version == APP_VERSION)
					{
						//If it is same means No Updates are available
						$rootScope.showDialog("<font color='blue' style='font-weight: bold;'>No updates are available!</font>","You are up to date.");
					}
					else {
						//There might be update is available
						// A confirm dialog
						   var confirmPopup = $ionicPopup.confirm({
						     title: "<center><font color='green' style='font-weight: bold;'>New Update is available!</font></center>",
						     template: "Version: " + $scope.updata.version + "<br/>" + $scope.updata.description + "<br />Size: " + $scope.updata.file_size + " MB",
						   });

						   confirmPopup.then(function(res) {
						     if(res) {
								//  var url = FILE_BASE_URL + 'appupdate/file_url/' + $scope.updata.file_dir + '/' + $scope.updata.file_url;
								var newurl = "market://details?id=com.sufyan.changevadodara";
								window.open(newurl, '_system', 'location=yes');

						       console.log('You are sure');
						     } else {
						       console.log('You are not sure');
						     }
						   });


					}
	            }
	            else {
	                //No Event Found
	                $scope.no_event = true;
	            }
	        }, function errorCallback(response) {
	            console.log("Error: ",response);
	        });

		}
    });
})();
