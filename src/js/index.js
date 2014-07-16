require(['./home/home_routes',
    './admin/admin_routes',
    './order/order_routes'
], function () {
    angular.module('ohFresh', ['ohFresh.home', 'ohFresh.admin', 'ohFresh.order']);
    angular.bootstrap(document, ['ohFresh']);
});

function TopNavbarCtrl($scope) {
    $scope.$on('back.show', function () {
        $scope.showBack = true;
    });
    $scope.$on('back.hidden', function () {
        $scope.showBack = false;
    });
}
