(function(){
	var app = angular.module('starter');

	app.controller('FacebookController',function($scope,$state,$ionicLoading,$rootScope,$http,ACCESS_TOKEN,REST_BASE_URL)
    {
        $scope.posts = {};
        $scope.pInfo = {};
        $scope.bookmark = {};
        $scope.no_more_posts = false;
        $scope.data_fetched = false;
		$scope.went_wrong = false;
        var count = 0;
        console.log("FacebookController");
        // var rest_url = "https://graph.facebook.com/v2.7/ChangeVadodara/feed?fields=picture%2Cmessage%2Cfull_picture%2Clikes.limit(99)%2Ccreated_time&limit=10&access_token=" + ACCESS_TOKEN;

        // console.log(rest_url);



        //Get Page Name and Profile Info
        // var page_info = "https://graph.facebook.com/v2.7/ChangeVadodara?fields=picture%7Burl%7D%2Cname&access_token=" + ACCESS_TOKEN;
		var page_info = REST_BASE_URL + "getFacebookPageInfo";
        $http({
          method: 'GET',
          url: page_info
        })
        .then(function successCallback(response) {
            $scope.pInfo = response.data.data;
            console.log($scope.pInfo);
        }, function errorCallback(response) {
            console.log("Error: ",response);
        });

		var rest_url = REST_BASE_URL + "getFacebookFeed";
        // Get Page feed
        $http({
          method: 'POST',
          url: rest_url
        })
        .then(function successCallback(response) {
            console.log("response data: ", response.data);
			if(response.data.status === "success") {
				$scope.posts = response.data.data.data;
				$scope.bookmark = response.data.data.paging;
				$scope.went_wrong = false;
				if($scope.bookmark && $scope.bookmark.next)
				{
					$scope.data_fetched = true;
					$scope.more_posts = true;
				}
				else {
					$scope.more_posts = false;
				}
			}
			else {
				$scope.went_wrong = true;
			}

        }, function errorCallback(response) {
            console.log("Error: ",response);
        });

		var more_url = REST_BASE_URL + "getMoreFacebookFeed";

        $scope.loadMorePost = function()
        {
            console.log("loadMorePost()");
            count = count + 1;
            console.log("Counter: ",count);
            // Get Page feed
            $http({
              method: 'POST',
              url: more_url,
			  data: {
				  bookmark: $scope.bookmark.next
			  }
            })
            .then(function successCallback(response) {
                console.log("response data: ", response.data);
				if(response.data.status === "success")
				{
					$scope.went_wrong = false;
					$scope.posts = $scope.posts.concat(response.data.data.data);
					$scope.bookmark = response.data.data.paging;
					$scope.$broadcast('scroll.infiniteScrollComplete');

					if($scope.bookmark && $scope.bookmark.next)
					{
						$scope.data_fetched = true;
						$scope.more_posts = true;
					}
					else {
						$scope.more_posts = false;
					}
				}
				else {
					$scope.went_wrong = true;
				}

            }, function errorCallback(response) {
                console.log("Error: ",response);
            });

        };
    });
})();
