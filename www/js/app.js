// Dark Horse Festival App
'use strict';

angular.module('darkHorse', ['ionic', 'ionic.service.core', 'ionic.service.analytics', 'ngCordova', 'darkHorse.controllers', 'darkHorse.services'])
.run(function($rootScope, $state, $ionicPlatform, $ionicAnalytics, AccountService, ANALYTICS_EVENTS, AUTH_EVENTS) {
    // Making the analytics events constants available to the templates.
    $rootScope.ANALYTICS_EVENTS = ANALYTICS_EVENTS;
    
    // Adding standard check for authorisation being required.
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
        if ('data' in toState && 'authenticationRequired' in toState.data && toState.data.authenticationRequired && !AccountService.isAuthenticated()) {
            // Authentication is required and user is currently not authenticated.
            event.preventDefault();
            $state.go($state.current, {}, { reload: true });
            $rootScope.$broadcast(AUTH_EVENTS.PRESENT_LOGIN, toState);
        }
    });

    $ionicPlatform.ready(function() {
        // Registers the app for analytics with the IONIC platform.
        $ionicAnalytics.register();
        $ionicAnalytics.setGlobalProperties(function(eventCollection, eventData) {
            eventData.isAuthenticated = false;
            eventData.username = null;
        });

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    
    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
    
    .state('app.welcome', {
        url: '/welcome',
        views: {
            'menuContent': {
                templateUrl: 'templates/welcome.html'
            }
        }
    })

    .state('app.map', {
        url: '/map',
        views: {
            'menuContent': {
                templateUrl: 'templates/map.html',
                controller: 'MapCtrl'
            }
        }
    })

    .state('app.schedule', {
        url: '/schedule',
        views: {
            'menuContent': {
                templateUrl: 'templates/schedule.html',
                controller: 'ScheduleCtrl'
            }
        }
    })
    
    .state('app.onnow', {
        url: '/onnow',
        views: {
            'menuContent': {
                templateUrl: 'templates/onnow.html',
                controller: 'ScheduleCtrl'
            }
        }
    })
    
    .state('app.event', {
        url: '/event/:eventId',
        views: {
            'menuContent': {
                templateUrl: 'templates/event.html',
                controller: 'EventCtrl'
            }
        }
    })
    
    .state('app.account', {
        url: '/account',
        views: {
            'menuContent': {
                templateUrl: 'templates/account.html',
                controller: 'AccountCtrl'
            }
        },
        data: {
            authenticationRequired: true
        }
    });
    
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/welcome');
});