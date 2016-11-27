(function () {
    'use strict';

    angular.module('darkHorse.services')
    .factory('WeatherService', ['$timeout', '$q', '$http', '$sce', '$ionicAnalytics', 'ANALYTICS_EVENTS', 'API_ENDPOINT', weatherService]);

    function weatherService($timeout, $q, $http, $sce, $ionicAnalytics, ANALYTICS_EVENTS, API_ENDPOINT) {
        var api = {
            getWeatherForecast: onGetWeatherForecast
         };

         function onGetWeatherForecast() {
             $ionicAnalytics.track(ANALYTICS_EVENTS.GET_FORECAST, {});

             return $q(function(resolve, reject) {
                 var locationData = {
                     lat: 54.31922,
                     lon: -4.4275327
                 };

                 var weatherResult = {
                     summary: '',
                     icon: 'none',
                     temperature: 0,
                     windSpeed: 0,
                     windBearing: 0
                 };

                 var weatherApiUri = API_ENDPOINT.WEATHER + '/' + locationData.lat + ',' + locationData.lon + '?units=uk2&callback=JSON_CALLBACK';
                 $sce.trustAsResourceUrl(weatherApiUri);

                 $http.jsonp(weatherApiUri).then(function(result) {
                     weatherResult.summary = result.data.currently.summary;
                     weatherResult.icon = result.data.currently.icon;
                     weatherResult.temperature = result.data.currently.temperature;
                     weatherResult.windSpeed = result.data.currently.windSpeed;
                     weatherResult.windBearing = result.data.currently.windBearing;
                     resolve(weatherResult);
                 }, function(errorResult) {
                     reject();
                 })
             });
         };

        return api;
    };
}());