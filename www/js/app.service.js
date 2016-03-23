(function () {
    'use strict';

    angular.module('darkHorse.services', [])
    .factory('AppService', [appService])
    .factory('AuthInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS', authInterceptor]);
    
    function appService() {
        var api = {};
        
        return api;
    }
    
    function authInterceptor($rootScope, $q, AUTH_EVENTS) {
        var api = {
            responseError: onResponseError
        };
        
        function onResponseError(response) {
            $rootScope.$broadcast({
                401: AUTH_EVENTS.NOT_AUTHENTICATED,
                403: AUTH_EVENTS.NOT_AUTHORISED
            }[response.status], response);
            
            return $q.reject(response);
        };
        
        return api;
    }
}());