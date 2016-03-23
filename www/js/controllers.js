angular.module('darkHorse.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicAnalytics, ANALYTICS_EVENTS) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  $scope.$on('$ionicView.enter', function(e) {
  });

  $scope.isAuthenticated = false;
  $scope.currentUsername = null;
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $ionicAnalytics.track(ANALYTICS_EVENTS.LOGIN_ATTEMPT, { username: $scope.loginData.username });
    
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $ionicAnalytics.track(ANALYTICS_EVENTS.SUCCESSFUL_LOGIN, { username: $scope.loginData.username });
      $scope.isAuthenticated = true;
      $scope.currentUsername = $scope.loginData.username;
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('AccountCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
    if (!e.targetScope.isAuthenticated) {
      e.targetScope.login();
    }
  });
})

.controller('MapCtrl', function($scope, $stateParams) {
  
})

.controller('EventCtrl', function($scope, $stateParams) {
  
});
