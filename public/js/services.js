/* global angular, $ */
(function () {
    'use strict';

    var appServices = angular.module('SUNSHOT.services', []);


    appServices.factory('dataServices', ['$http', '$q', function ($http, $q) {
        return {
            query: function (url) {
                var deferred = $q.defer();
                $http({method: 'GET', url: 'data/' + url + '.json'}).
                    success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            }
        };
    }]);


    appServices.factory('restReq', ['$http', '$q', function ($http, $q) {
        return {
            query: function (url,user) {
                var deferred = $q.defer();
                $http.post(url,{user:user}).
                    success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            }
        };
    }]);


})();
