(function () {
    'use strict';

    angular.module('darkHorse.services')
    .factory('AccountService', ['$timeout', '$q', '$http', '$ionicAnalytics', 'ANALYTICS_EVENTS', 'API_ENDPOINT', accountService]);

    function accountService($timeout, $q, $http, $ionicAnalytics, ANALYTICS_EVENTS, API_ENDPOINT) {
        var api = {
            login: onLogin,
            logout: onLogout,
            isAuthenticated: checkIfAuthenticated,
            currentUserFullName: checkCurrentUserFullName,
            signUp: onSignUp,
            requestVerificationEmail: onRequestVerificationEmail
        };

        var tokenLocalStorageKey = 'DarkHorseToken';
        var isAuthenticated = false;
        var authToken;
        var currentUserFullName = null;

        function loadUserCredentials() {
            var token = window.localStorage.getItem(tokenLocalStorageKey);
            if (token) {
                useCredentials(token);
            }
        };

        function useCredentials(token) {
            isAuthenticated = true;
            authToken = token;

            // Sets the token as the header for all requests.
            $http.defaults.headers.common.Authorization = authToken;
        };

        function storeUserCredentials(token) {
            window.localStorage.setItem(tokenLocalStorageKey, token);
            useCredentials(token);
        };

        function destroyUserCredentials() {
            authToken = undefined;
            isAuthenticated = false;
            $http.defaults.headers.common.Authorization = undefined;
            window.localStorage.removeItem(tokenLocalStorageKey);
        }

        function onLogin(username, password) {
            $ionicAnalytics.track(ANALYTICS_EVENTS.LOGIN_ATTEMPT, {});

            return $q(function(resolve, reject){
                var authData = {
                    email: username,
                    password: password
                };

                $http.post(API_ENDPOINT.URL + '/authenticate', authData)
                    .then(function(result) {
                        if (result.data.success) {
                            storeUserCredentials(result.data.token);

                            $ionicAnalytics.setGlobalProperties(function(eventCollection, eventData) {
                                eventData.isAuthenticated = true;
                                eventData.username = username;
                            });

                            $ionicAnalytics.track(ANALYTICS_EVENTS.SUCCESSFUL_LOGIN, {});
                            checkCurrentUserFullName();
                            resolve('Successfully logged in.');
                        } else {
                            $ionicAnalytics.track(ANALYTICS_EVENTS.FAILED_LOGIN, { 
                                reason: result.data.msg 
                            });
                            
                            reject({ msg: result.data.msg, emailNotVerified: result.data.emailNotVerified });
                        }
                    });
            });
        };

        function onLogout() {
            $ionicAnalytics.track(ANALYTICS_EVENTS.LOGOUT, {});
            destroyUserCredentials();

            $ionicAnalytics.setGlobalProperties(function(eventCollection, eventData) {
                eventData.isAuthenticated = false;
                eventData.username = null;
            });
        };

        function checkIfAuthenticated() {
            return isAuthenticated;
        };

        function checkCurrentUserFullName() {
            if ((currentUserFullName === null) && (isAuthenticated)) {
                $http.get(API_ENDPOINT.URL + '/userinfo')
                    .then(function(result) {
                        if (result.data.success) {
                            currentUserFullName = result.data.fullName;
                        } else {
                            currentUserFullName = null;
                        }
                    });
            }

            return currentUserFullName;
        };

        function onSignUp(signUpData) {
            $ionicAnalytics.track(ANALYTICS_EVENTS.SIGNUP_ATTEMPT, {
                fullName: signUpData ? signUpData.fullName : '',
                email: signUpData ? signUpData.email : ''
            });

            return $q(function(resolve, reject) {
                // Local validation for performance purposes.
                if ((!signUpData.fullName) ||
                    (!signUpData.email) ||
                    (!signUpData.password) ||
                    (!signUpData.verifyPassword)) {
                        $ionicAnalytics.track(ANALYTICS_EVENTS.FAILED_SIGNUP, {
                            fullName: signUpData ? signUpData.fullName : '',
                            email: signUpData ? signUpData.email : '',
                            reason: 'User did not provide a required field.'
                        });
                        reject('Please provide e-mail, password and full name.');
                } else {
                    // Local validation passed, checking if passwords match.
                    if (signUpData.password !== signUpData.verifyPassword) {
                        $ionicAnalytics.track(ANALYTICS_EVENTS.FAILED_SIGNUP, {
                            fullName: signUpData ? signUpData.fullName : '',
                            email: signUpData ? signUpData.email : '',
                            reason: 'Passwords did not match.'
                        });
                        reject('The password and verification do not match.');
                    } else {
                        // Passwords match, creating user.
                        var newUser = {
                            email: signUpData.email,
                            password: signUpData.password,
                            fullName: signUpData.fullName
                        };

                        $http.post(API_ENDPOINT.URL + '/signup', newUser)
                            .then(function(result) {
                                if (result.data.success) {
                                    $ionicAnalytics.track(ANALYTICS_EVENTS.SUCCESSFUL_SIGNUP, {
                                        fullName: signUpData ? signUpData.fullName : '',
                                        email: signUpData ? signUpData.email : ''
                                    });

                                    resolve(result.data.msg);
                                } else {
                                    $ionicAnalytics.track(ANALYTICS_EVENTS.FAILED_SIGNUP, {
                                        fullName: signUpData ? signUpData.fullName : '',
                                        email: signUpData ? signUpData.email : '',
                                        reason: 'Server error: ' + result.data.msg
                                    });

                                    reject(result.data.msg);
                                }
                            });
                    }
                }
            });
        };
        
        function onRequestVerificationEmail(email) {
            $ionicAnalytics.track(ANALYTICS_EVENTS.RESEND_VERIFICATION_EMAIL, {
                email: email
            });
            
            return $q(function(resolve, reject) {
                $http.post(API_ENDPOINT.URL + '/send-verify-email', { email: email })
                    .then(function(result) {
                        if (result.data.success) {
                            $ionicAnalytics.track(ANALYTICS_EVENTS.SUCCESSFUL_RESEND_VERIFICATION_EMAIL, {
                                email: email
                            });
                            
                            resolve(result.data.msg);
                        } else {
                            $ionicAnalytics.track(ANALYTICS_EVENTS.FAILED_RESEND_VERIFICATION_EMAIL, {
                                email: email,
                                reason: 'Server error: ' + result.data.msg
                            });
                            
                            reject(result.data.msg);
                        }
                    });
            });
        };

        loadUserCredentials();
        return api;
    }
}());