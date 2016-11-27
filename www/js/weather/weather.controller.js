(function () {
    'use strict';
    
    angular.module('darkHorse.controllers')
    .controller('WeatherCtrl', ['$scope', '$stateParams', '$ionicPlatform', 'WeatherService', function($scope, $stateParams, $ionicPlatform, WeatherService) {
        $ionicPlatform.ready(function() {
            WeatherService.getWeatherForecast().then(function(successData) {
                $scope.weatherSummary = successData.summary;
                $scope.weatherTemperature = successData.temperature;
                $scope.weatherWindSpeed = successData.windSpeed;
            }, function(errorData) {
                
            });
        });
    }]);
}());