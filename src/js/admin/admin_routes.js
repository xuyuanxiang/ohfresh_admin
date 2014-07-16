define(['./admin_controllers'], function () {
    angular.module('ohFresh.admin', ['ngRoute', 'ohFresh.admin.controllers'])
        .config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider.when('/admin/login', {
                    templateUrl: 'tpl/admin/login.html',
                    controller: 'LoginCtrl'
                });
            }
        ]
    );
});
