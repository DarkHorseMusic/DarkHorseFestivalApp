(function () {
    'use strict';

    angular.module('darkHorse.services')
    .factory('ScheduleService', ['$q', '$ionicAnalytics', 'ANALYTICS_EVENTS', 'API_ENDPOINT', scheduleService]);
    
    function scheduleService($q, $ionicAnalytics, ANALYTICS_EVENTS, API_ENDPOINT) {
        var api = {
            getAllSchedules: onGetAllSchedules
        };

        function onGetAllSchedules() {
            $ionicAnalytics.track(ANALYTICS_EVENTS.GET_ALLSCHEDULES, {});

            return $q(function(resolve, reject) {
                var schedules = [
                    {
                        id: 1,
                        icon: 'microphone',
                        name: 'Music Act 1',
                        day: 'Friday',
                        startTime: '20:00',
                        endTime: '21:00',
                        location: 'Barn',
                        description: 'Indie rock band that plays really well.'
                    },
                    {
                        id: 2,
                        icon: 'musical-notes',
                        name: 'Music Act 2',
                        day: 'Friday',
                        startTime: '20:00',
                        endTime: '21:00',
                        location: 'Field',
                        description: 'Indie rock band that plays so so.'
                    },
                    {
                        id: 3,
                        icon: 'musical-note',
                        name: 'Music Act 3',
                        day: 'Friday',
                        startTime: '20:00',
                        endTime: '21:00',
                        location: 'Ditch',
                        description: 'Indie rock band that really shouldn\'t call itself a band.'
                    },
                    {
                        id: 4,
                        icon: 'bonfire',
                        name: 'Folk Act 1',
                        day: 'Saturday',
                        startTime: '20:00',
                        endTime: '21:00',
                        location: 'Barn',
                        description: 'Folk duo that plays really well.'
                    },
                    {
                        id: 5,
                        icon: 'bug',
                        name: 'Folk Act 2',
                        day: 'Saturday',
                        startTime: '20:00',
                        endTime: '21:00',
                        location: 'Field',
                        description: 'Folk trio that plays so so.'
                    },
                    {
                        id: 6,
                        icon: 'cloudy-night',
                        name: 'Folk Act 3',
                        day: 'Saturday',
                        startTime: '20:00',
                        endTime: '21:00',
                        location: 'Ditch',
                        description: 'A folk. Don\'t really play anything.'
                    },
                    {
                        id: 7,
                        icon: 'alert',
                        name: 'Random Act 1',
                        day: 'Sunday',
                        startTime: '20:00',
                        endTime: '21:00',
                        location: 'Barn',
                        description: 'We can be stressed about things.'
                    },
                    {
                        id: 8,
                        icon: 'aperture',
                        name: 'Random Act 2',
                        day: 'Sunday',
                        startTime: '20:00',
                        endTime: '21:00',
                        location: 'Field',
                        description: 'Ran out of icons to add.'
                    },
                    {
                        id: 9,
                        icon: 'bulb',
                        name: 'Random Act 3',
                        day: 'Sunday',
                        startTime: '20:00',
                        endTime: '21:00',
                        location: 'Ditch',
                        description: 'A really good idea.'
                    }
                ];

                resolve(schedules);
            });
        };
        
        return api;
    }
}());