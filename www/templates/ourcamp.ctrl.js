(function(){
	var app = angular.module('starter');

	app.controller('OurCampController',function($scope,$state,$ionicLoading,$rootScope)
    {
        console.log("OurCampController");

        var latLng = new google.maps.LatLng(22.3088325, 73.1418363); //Samta
        var latLng2 = new google.maps.LatLng(22.322102, 73.1327393); //Gotri
        var latLng3 = new google.maps.LatLng(22.2987019,73.2445035); //Waghodia
        var latLng4 = new google.maps.LatLng(22.2779505,73.1896858); //CVC School Manjalpur

        var mapOptions = {
          center: latLng,
          zoom: 11,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        //Wait until the map is loaded
        google.maps.event.addListenerOnce($scope.map, 'idle', function(){

          var marker = new google.maps.Marker({
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              position: latLng,
              label: 'S',
              title: 'Samta'
          });

          var marker2 = new google.maps.Marker({
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              position: latLng2,
              label: 'G',
              title: 'Gotri'
          });

          var marker3 = new google.maps.Marker({
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              position: latLng3,
              label: 'W',
              title: 'Waghodia'
          });
		  var marker4 = new google.maps.Marker({
		  	map: $scope.map,
		  	animation: google.maps.Animation.DROP,
		  	position: latLng4,
		  	label: 'M',
		  	title: 'Manjalpur'
		  });

          var infoWindow = new google.maps.InfoWindow({
              content: "CVC Education School, Samta"
          });
          var infoWindow2 = new google.maps.InfoWindow({
              content: "CVC Education School, Gotri"
          });
          var infoWindow3 = new google.maps.InfoWindow({
              content: "CVC Education School, Waghodia"
          });

		  var infoWindow4 = new google.maps.InfoWindow({
			  content: "CVC Education School, Manjalpur"
		  });

          google.maps.event.addListener(marker, 'click', function () {
              infoWindow.open($scope.map, marker);
          });
          google.maps.event.addListener(marker2, 'click', function () {
              infoWindow2.open($scope.map, marker2);
          });
          google.maps.event.addListener(marker3, 'click', function () {
              infoWindow3.open($scope.map, marker3);
          });
		  google.maps.event.addListener(marker3, 'click', function () {
			  infoWindow4.open($scope.map, marker4);
		  });

        });

		//
		// function addMarker(_marker,map,pos,title,label) {
		// 	_marker = new google.maps.Marker({
        //         map: map,
        //         animation: google.maps.Animation.DROP,
        //         position: pos,
        //         label: label,
        //         title: title
        //     });
		// }
    });
})();
