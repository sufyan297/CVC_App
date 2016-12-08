(function(){
	var app = angular.module('starter');

	app.controller('FacebookController',function($scope,$state,$ionicLoading,$rootScope,$http,ACCESS_TOKEN)
    {
        $scope.posts = {};
        $scope.pInfo = {};
        $scope.bookmark = {};
        $scope.no_more_posts = false;
        $scope.data_fetched = false;
        var count = 0;
        console.log("FacebookController");
        var rest_url = "https://graph.facebook.com/v2.7/ChangeVadodara/feed?fields=picture%2Cmessage%2Cfull_picture%2Clikes.limit(99)%2Ccreated_time&limit=10&access_token=" + ACCESS_TOKEN;

        // console.log(rest_url);



        //Get Page Name and Profile Info
        var page_info = "https://graph.facebook.com/v2.7/ChangeVadodara?fields=picture%7Burl%7D%2Cname&access_token=" + ACCESS_TOKEN;
        $http({
          method: 'GET',
          url: page_info
        })
        .then(function successCallback(response) {
            $scope.pInfo = response.data;
            console.log($scope.pInfo);
        }, function errorCallback(response) {
            console.log("Error: ",response);
        });

        // Get Page feed
        $http({
          method: 'GET',
          url: rest_url
        })
        .then(function successCallback(response) {
            console.log("response data: ", response.data);
            $scope.posts = response.data.data;
            $scope.bookmark = response.data.paging;

            if($scope.bookmark && $scope.bookmark.next)
            {
                $scope.data_fetched = true;
                $scope.more_posts = true;
            }
            else {
                $scope.more_posts = false;
            }
        }, function errorCallback(response) {
            console.log("Error: ",response);
        });


        $scope.loadMorePost = function()
        {
            console.log("loadMorePost()");
            count = count + 1;
            console.log("Counter: ",count);
            // Get Page feed
            $http({
              method: 'GET',
              url: $scope.bookmark.next
            })
            .then(function successCallback(response) {
                console.log("response data: ", response.data);
                $scope.posts = $scope.posts.concat(response.data.data);
                $scope.bookmark = response.data.paging;
                $scope.$broadcast('scroll.infiniteScrollComplete');

                if($scope.bookmark && $scope.bookmark.next)
                {
                    $scope.data_fetched = true;
                    $scope.more_posts = true;
                }
                else {
                    $scope.more_posts = false;
                }
            }, function errorCallback(response) {
                console.log("Error: ",response);
            });

        };
    });
})();
