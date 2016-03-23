(function () {
    'use strict';

    angular.module('darkHorse.services')
    .factory('AccountService', ['$timeout', '$q', '$http', '$ionicAnalytics', 'ANALYTICS_EVENTS', accountService]);
    
    function accountService($timeout, $q, $http, $ionicAnalytics, ANALYTICS_EVENTS) {
        var api = {
            login: onLogin,
            logout: onLogout,
            isAuthenticated: checkIfAuthenticated,
            currentUsername: checkCurrentUsername
        };
        
        var isAuthenticated = false;
        var currentUsername = null;
        
        function onLogin(username, password) {
            $ionicAnalytics.track(ANALYTICS_EVENTS.LOGIN_ATTEMPT, {});
            
            return $q(function(resolve, reject){
                // Simulated login, replace this with real login code.
                $timeout(function() {
                    isAuthenticated = username != null && password != null && username.length > 0 && password.length > 0;
                    currentUsername = username;
                    var token = isAuthenticated ? 'a-token' : null;
                    
                    $ionicAnalytics.setGlobalProperties(function(eventCollection, eventData) {
                        eventData.isAuthenticated = true;
                        eventData.username = username;
                    });
                    
                    if (isAuthenticated && token != null)
                    {
                        $http.defaults.headers.common['X-Auth-Token'] = token;
                        $ionicAnalytics.track(ANALYTICS_EVENTS.SUCCESSFUL_LOGIN, {});
                        resolve({
                            isAuthenticated: isAuthenticated,
                            currentUsername: currentUsername,
                            token: token
                        });
                    }
                    else {
                        $ionicAnalytics.track(ANALYTICS_EVENTS.FAILED_LOGIN, {});
                        reject({
                            isAuthenticated: isAuthenticated,
                            currentUsername: null,
                            token: null
                        });
                    }
                }, 1000);
            });
        };
        
        function onLogout() {
            $ionicAnalytics.track(ANALYTICS_EVENTS.LOGOUT, {});

            $http.defaults.headers.common['X-Auth-Token'] = undefined;
            isAuthenticated = false;
            currentUsername = null;

            $ionicAnalytics.setGlobalProperties(function(eventCollection, eventData) {
                eventData.isAuthenticated = false;
                eventData.username = null;
            });
        };
        
        function checkIfAuthenticated() {
            return isAuthenticated;
        };
        
        function checkCurrentUsername() {
            return currentUsername;
        };
        
        return api;
    }
}());