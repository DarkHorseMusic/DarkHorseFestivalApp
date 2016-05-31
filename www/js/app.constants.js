(function () {
    'use strict';
    
    angular.module('darkHorse')
    .constant('ANALYTICS_EVENTS', {
        SIGNUP_ATTEMPT: 'Sign Up Attempt',
        SUCCESSFUL_SIGNUP: 'Successful Sign Up',
        FAILED_SIGNUP: 'Failed Sign Up',
        LOGIN_ATTEMPT: 'Login Attempt',
        SUCCESSFUL_LOGIN: 'Successful Login',
        FAILED_LOGIN: 'Failed Login Attempt',
        LOGOUT: 'Logout',
        OPEN_WELCOME: 'Open Welcome',
        OPEN_MAP: 'Open Map',
        OPEN_SCHEDULE: 'Open Schedule',
        OPEN_ONNOW: 'Open What\'s On Now',
        OPEN_ACCOUNT: 'Open My Account',
        OPEN_SIGNUP: 'Open Sign Up',
        OPEN_FINDMYTENT: 'Open Find My Tent',
        TOGGLE_TORCH: 'Toggle Torch',
        OPEN_SNAPCHAT: 'Open Snapchat',
        OPEN_FACEBOOK: 'Open Facebook',
        OPEN_WEATHER: 'Open Weather',
        OPEN_BAR: 'Open Bar',
        OPEN_FOOD: 'Open Food',
        OPEN_FIRSTAID: 'Open First Aid'
    })
    .constant('AUTH_EVENTS', {
        PRESENT_LOGIN: 'present-login',
        NOT_AUTHENTICATED: 'not-authenticated',
        NOT_AUTHORISED: 'not-authorised'
    })
    .constant('API_ENDPOINT', {
        //URL: 'https://darkhorsemusic.herokuapp.com/api'
        URL: 'http://localhost:5000/api'
    });
}());