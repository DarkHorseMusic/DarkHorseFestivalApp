(function () {
    'use strict';
    
    angular.module('darkHorse.controllers', [])
    .controller('AppCtrl', ['$scope', '$state', '$ionicModal', '$ionicPopup', 'AccountService', 'AUTH_EVENTS', function($scope, $state, $ionicModal, $ionicPopup, AccountService, AUTH_EVENTS) {
        // Form data for the login modal
        $scope.loginData = {};
        $scope.showSignOut = AccountService.isAuthenticated();

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.loginModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLoginModal = function() {
            $scope.redirectState = null;
            $scope.loginModal.hide();
        };

        // Open the login modal
        function showLoginModal() {
            $scope.loginModal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            AccountService.login($scope.loginData.username, $scope.loginData.password)
            .then(function(successData) {
                $scope.closeLoginModal();
                $scope.showSignOut = AccountService.isAuthenticated();
                if ($scope.redirectState != null) {
                    $state.go($scope.redirectState);
                    $scope.redirectState = null;
                }
            }, function(errorData) {
                $ionicPopup.alert({
                   title: 'Authentication failed',
                   template: 'Please check your credentials and try again.' 
                });
            });
        };
        
        $scope.doSignOut = function() {
            AccountService.logout();
            var isAuthenticated = AccountService.isAuthenticated();
            $scope.showSignOut = isAuthenticated; 
            if (!isAuthenticated) {
                $ionicPopup.alert({
                   title: 'Signed out',
                   template: 'You have been successfully signed out.' 
                });
            }
        };
        
        $scope.$on(AUTH_EVENTS.PRESENT_LOGIN, function(event, toState) {
            $scope.redirectState = toState;
            showLoginModal();
        });        
    }]);
}());