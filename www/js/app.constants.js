(function () {
    'use strict';
    
    angular.module('darkHorse')
    .constant('ANALYTICS_EVENTS', {
        LOGIN_ATTEMPT: 'Login Attempt',
        SUCCESSFUL_LOGIN: 'Successful Login',
        FAILED_LOGIN: 'Failed Login Attempt',
        LOGOUT: 'Logout',
        OPEN_WELCOME: 'Open Welcome',
        OPEN_MAP: 'Open Map',
        OPEN_SCHEDULE: 'Open Schedule',
        OPEN_ONNOW: 'Open What\'s On Now',
        OPEN_ACCOUNT: 'Open My Account'
    })
    .constant('AUTH_EVENTS', {
        PRESENT_LOGIN: 'present-login',
        NOT_AUTHENTICATED: 'not-authenticated',
        NOT_AUTHORISED: 'not-authorised'
    });
}());