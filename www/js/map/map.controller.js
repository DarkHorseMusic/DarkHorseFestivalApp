(function () {
    'use strict';
    
    angular.module('darkHorse.controllers')
    .controller('MapCtrl', ['$scope', '$stateParams', '$ionicPlatform', function($scope, $stateParams, $ionicPlatform) {
        $ionicPlatform.ready(function() {
            var posOptions = {
                timeout: 10000,
                enableHighAccuracy: true
            };
            
            var posOnSuccess = function(position) {
                var latLng = new google.maps.LatLng(54.319621, -4.4257215);
                var mapOptions = {
                    center: latLng,
                    zoom: 19,
                    minZoom: 18,
                    maxZoom: 20,
                    draggable: false,
                    scrollwheel: false,
                    disableDefaultUI: true,
                    disableDoubleClickZoom: true,
                    panControl: false,
                    mapTypeId: google.maps.MapTypeId.HYBRID,
                };
                
                $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
                $scope.map.fitBounds(new google.maps.LatLng(54.319109, -4.426225), new google.maps.LatLng(54.320133, -4.425218));
                //$scope.map = plugin.google.maps.Map.getMap(document.getElementById("map"), mapOptions);
            };
            
            var posOnError = function(error) {
                console.log("There was a problem acquiring the current location.");
            };
            
            navigator.geolocation.getCurrentPosition(posOnSuccess, posOnError, posOptions);
        });
    }]);
}());