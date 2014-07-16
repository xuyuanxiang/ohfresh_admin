require(['./application',
    './home/home_routes',
    './admin/admin_routes',
    './order/order_routes'
], function (OhFresh) {
    angular.module('ohFresh', ['ohFresh.home', 'ohFresh.admin', 'ohFresh.order'])
        .controller('RootCtrl', ['$scope', '$cookieStore', '$location',
            function ($scope, $cookieStore, $location) {
                $scope.$on('back.change', function (scope, data) {
                    $scope.backUrl = data ? data.url : null;
                    OhFresh.sizeNavbars('.view-main');
                });
            }
        ]);
    angular.bootstrap(document, ['ohFresh']);
    $('body').removeClass('init');
});
