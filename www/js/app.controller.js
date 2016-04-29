(function () {
    'use strict';
    
    angular.module('darkHorse.controllers', [])
    .controller('AppCtrl', ['$scope', '$state', '$ionicModal', '$ionicPopup', 'AccountService', 'AUTH_EVENTS', function($scope, $state, $ionicModal, $ionicPopup, AccountService, AUTH_EVENTS) {
        // Form data for the modals.
        $scope.loginData = {};
        $scope.signUpData = {};

        // Whether to show the sign out option or not.
        $scope.showSignOut = AccountService.isAuthenticated();

        // Creates the login modal that we will use later.
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.loginModal = modal;
        });

        // Creates the sign up modal that we will use later.
        $ionicModal.fromTemplateUrl('templates/signup.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.signUpModal = modal;
        });

        // Triggered in the login modal to close it.
        $scope.closeLoginModal = function() {
            $scope.redirectState = null;
            $scope.loginModal.hide();
        };

        // Opens the login modal
        function showLoginModal() {
            $scope.loginModal.show();
        };

        $scope.closeSignUpModal = function() {
            $scope.redirectState = null;
            $scope.signUpModal.hide();
        };

        // Opens the sign up modal.
        $scope.showSignUpModal = function() {
            $scope.closeLoginModal();
            $scope.signUpModal.show();
        };

        // Performs the login action when the user submits the login form.
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
                var buttons = [{
                    text: 'Ok',
                    type: 'button-positive'
                }];
                
                if (errorData.emailNotVerified) {
                    buttons.push({
                        text: 'Re-send email',
                        type: 'button-dark',
                        onTap: function(e) {
                            AccountService.requestVerificationEmail($scope.loginData.username).then(function(successMessage){
                                $ionicPopup.alert({
                                    title: 'Verification e-mail sent',
                                    template: successMessage
                                });
                            }, function(errorMessage) {
                                $ionicPopup.alert({
                                    title: 'Verification e-mail failed',
                                    template: errorMessage
                                });
                            });
                        }
                    });
                }

                $ionicPopup.alert({
                   title: 'Authentication failed',
                   template: errorData.msg,
                   buttons: buttons
                });
            });
        };
        
        // Performs the log out action when the user selects the option to log out.
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
        
        // Performs the sign up action when the user submits the sign up form.
        $scope.doSignUp = function() {
            AccountService.signUp($scope.signUpData)
                .then(function(msg) {
                    $state.go('app.account');
                    $ionicPopup.alert({
                        title: 'Successful registration',
                        template: msg
                    });
                }, function(errMsg) {
                    $ionicPopup.alert({
                        title: 'Registration failed',
                        template: errMsg
                    });
                });
        };

        $scope.$on(AUTH_EVENTS.PRESENT_LOGIN, function(event, toState) {
            $scope.redirectState = toState;
            showLoginModal();
        });        
    }]);
}());