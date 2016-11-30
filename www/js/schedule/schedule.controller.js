(function () {
    'use strict';
        
    angular.module('darkHorse.controllers')
    .controller('ScheduleCtrl', ['$scope', '$stateParams', '$ionicActionSheet', '$filter', 'ScheduleService', function($scope, $stateParams, $ionicActionSheet, $filter, ScheduleService) {
        $scope.showScheduleOptions = onShowScheduleOptions;
        $scope.schedules = {
            'Friday': null,
            'Saturday': null,
            'Sunday': null
        };

        var allSchedules = null;

        function populateAllSchedules() {
            ScheduleService.getAllSchedules().then(function(result) {
                allSchedules = result;
                $scope.schedules['Friday'] = $filter("filter")(result, { day: 'Friday' }, true);
                $scope.schedules['Saturday'] = $filter("filter")(result, { day: 'Saturday' }, true);
                $scope.schedules['Sunday'] = $filter("filter")(result, { day: 'Sunday' }, true);
            }, function(errorResult) {

            });
        }

        function onShowScheduleOptions(scheduleId) {
            var selectedSchedules = $filter("filter")(allSchedules, { id: scheduleId }, true);
            if ((selectedSchedules === undefined) || (selectedSchedules === null) || (selectedSchedules.length === 0)) {
                return;
            }

            var selectedSchedule = selectedSchedules[0];

            $ionicActionSheet.show({
                buttons: [
                    {
                        text: 'Set reminder'
                    }
                ],
                //destructiveText: 'Remove reminder',
                titleText: selectedSchedule.name,
                cancelText: 'Cancel',
                cancel: function() {
                    // Cancel code here.
                },
                buttonClicked: function(index) {
                    return true;
                }
            });
        };

        populateAllSchedules();
    }]);
}());