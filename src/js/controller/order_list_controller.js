(function (angular, app, undefined) {
    app.controller('orderListController', [
        '$rootScope', '$scope', '$location', 'orderService', 'localStorageService',
        function ($rootScope, $scope, $location, orderService, localStorageService) {
            var admin = $scope.admin = angular.fromJson(localStorageService.get('admin'));
            if (!admin || !admin.id) {
                $location.url('/login');
                return;
            }

            $scope.status = 0;
            $scope.$watch('status', function (newValue, oldValue) {
                $scope.getOrders();
            });
            $scope.getOrders = function () {
                var conditions = {
                    status: $scope.status
                }
                orderService.getByConditions(conditions).then(function (data) {
                    $scope.orders = data;
                }, function (reason) {
                    alert(reason);
                });
            };
            $scope.calculateTotal = function (order) {
                var totalPrice = 0;
                if (order.orderDetail) {
                    angular.forEach(order.orderDetail, function (item) {
                        totalPrice = (item.productprice ? Number(item.productprice) : 0) * (item.productprice ? Number(item.count) : 0) + (item.freight ? Number(item.freight) : 0);
                    });
                }
                return {
                    price: totalPrice
                }
            }
        }
    ]);

})(angular, OhFreshAdmin, undefined);
