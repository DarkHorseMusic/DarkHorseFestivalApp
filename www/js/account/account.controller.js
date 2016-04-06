(function () {
    'use strict';
    
    angular.module('darkHorse.controllers')
    .controller('AccountCtrl', ['$scope', '$state', '$ionicModal', 'AccountService', 'AUTH_EVENTS', function($scope, $state, $ionicModal, AccountService, AUTH_EVENTS) {
        $scope.currentUserFullName = AccountService.currentUserFullName();
    }]);
}());