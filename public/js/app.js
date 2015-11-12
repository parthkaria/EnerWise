/* global angular */
(function () {
    'use strict';

    angular
        .module('SUNSHOT', [
            'ngRoute',
            'ngDropdowns',
            'placeholderShim',
            'rzModule',
            'SUNSHOT.controllers',
            'SUNSHOT.directive'
        ])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/landing', {
                    templateUrl: 'partials/landing.html',
                    controller: 'landingPage'
                })
                .when('/signup/:type', {
                    templateUrl: 'partials/signup.html',
                    controller: 'signupPage'
                })
                .when('/signin', {
                    templateUrl: 'partials/signin.html',
                    controller: 'signinPage'
                })
                .when('/thankyou', {
                    templateUrl: 'partials/thankyou.html',
                    controller: 'thankyouPage'
                })
                .when('/reset', {
                    templateUrl: 'partials/reset.html',
                    controller: 'resetPage'
                })
                .when('/admin', {
                    templateUrl: 'partials/admin.html',
                    controller: 'adminPage'
                })
                .when('/homeowner', {
                    templateUrl: 'partials/homeowner.html',
                    controller: 'homeownerPage'
                })
                .when('/financier', {
                    templateUrl: 'partials/financier.html',
                    controller: 'financierPage'
                })
                .otherwise({redirectTo: '/landing'});
        }]);
})();
