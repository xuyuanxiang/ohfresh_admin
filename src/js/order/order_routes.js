define(['./order_controllers'
], function () {
    angular.module('ohFresh.order', ['ngRoute', 'ohFresh.order.controllers'])
        .config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider.when('/order/list', {
                    templateUrl: 'tpl/order/list.html',
                    controller: 'OrderListCtrl'
                });
            }
        ]);
});