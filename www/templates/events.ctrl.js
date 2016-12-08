(function(){
	var app = angular.module('starter');

	app.controller('EventController',function($scope,$state,$ionicLoading,$rootScope,REST_BASE_URL,FILE_BASE_URL,$http)
    {
        console.log("EventController");
        $scope.events = {};
        $scope.no_event = false;
        $scope.img_url = FILE_BASE_URL + 'event';
        $scope.data_fetched = false;
        // Get Page feed
        $http({
          method: 'GET',
          url: REST_BASE_URL + 'getEvents'
        })
        .then(function successCallback(response) {
            console.log("response data: ", response.data);
            if(response.data.status == 'success')
            {
                //Events found
                $scope.events = response.data.data;
                $scope.data_fetched = true;
            }
            else {
                //No Event Found
                $scope.no_event = true;
            }
        }, function errorCallback(response) {
            console.log("Error: ",response);
        });


    });

	app.filter("asDate", function () {
		return function (input) {
			return new Date(input);
		};
	});
})();
