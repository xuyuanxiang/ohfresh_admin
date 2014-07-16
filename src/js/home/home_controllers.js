define(['../application',
    '../settings'], function (OhFresh, Settings) {
    angular.module('ohFresh.home.controllers', ['ngRoute', 'ngCookies'])
        .controller('HomeCtrl', ['$scope', '$routeParams', '$cookieStore', '$http', '$rootScope', '$location',
            function ($scope, $routeParams, $cookieStore, $http, $rootScope, $location) {
                $rootScope.$broadcast('back.change', null);
                var admin = $cookieStore.get('admin');
                if (!admin) {
                    return $location.url('/admin/login');
                }
                $scope.logout = function () {
                    $cookieStore.put('admin', null);
                    $location.url('/admin/login');
                }
            }
        ]);
});
