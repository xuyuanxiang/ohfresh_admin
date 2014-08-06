(function (angular, app, undefined) {
    app.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/home', {//主页
                controller: 'homeController',
                templateUrl: 'home.html'
            });

            $routeProvider.when('/login', {//登录
                controller: 'loginController',
                templateUrl: 'login.html'
            });

            $routeProvider.when('/order/list', {//订单
                controller: 'orderListController',
                templateUrl: 'order_list.html'
            });

            $routeProvider.otherwise({
                redirectTo: '/login'
            });
        }
    ]);
    angular.bootstrap(document, ['ohFreshAdmin']);
})(angular, OhFreshAdmin, undefined);
