define(['../application',
    '../settings'
], function (OhFresh, Settings) {
    angular.module('ohFresh.order.controllers', ['ngCookies'])
        .controller('OrderListCtrl', ['$scope', '$cookieStore', '$rootScope', '$location', '$http',
            function ($scope, $cookieStore, $rootScope, $location, $http) {
                $rootScope.$broadcast('back.change', {url: '#/home'});
                var admin = $cookieStore.get('admin');
                if (!admin) {
                    return $location.path('/admin/login');
                }
                $rootScope.$broadcast('back.show');
                $scope.changeStatus = function (value) {
                    if ($scope.status == value)
                        return;
                    OhFresh.showPreloader();
                    $scope.status = value;
                    var url = Settings.orderQuery + "&status=" + $scope.status;
                    if ($scope.status == 1)
                        url += "&userId=" + (admin ? admin.id : '');
                    $http.jsonp(url).success(function (data) {
                        OhFresh.hidePreloader();
                        $scope.orders = data;
                    }).error(function () {
                        OhFresh.hidePreloader();
                        OhFresh.addNotification({
                            title: "提示",
                            message: "系统连接失败！请稍后重试...",
                            hold: 3000
                        });
                    });
                };
                $scope.changeStatus(0);
                $scope.doSearch = function () {
                    OhFresh.showPreloader();
                    var mobileReg = new RegExp('^1[0-9]{10,11}$');
                    var codeReg = new RegExp('^[0-9]{13}');
                    var nameReg = new RegExp('(?:[\u4E00-\u9FFF]{1,8}·\u4E00-\u9FFF]{1,8})|(?:[\u4E00-\u9FFF]{2,5})|(^[a-zA-Z]{1,30}$)');
                    var url = Settings.orderQuery + "&status=" + $scope.status;
                    var keywords = $scope.keywords ? $scope.keywords.split(',') : [];
                    var mobile = '';
                    var name = '';
                    var no = '';
                    angular.forEach(keywords, function (value) {
                        if (mobileReg.test(value)) {
                            mobile = value;
                        } else if (nameReg.test(value)) {
                            name = value;
                        } else if (codeReg.test(value)) {
                            no = value;
                        }
                    });
                    url += '&mobilephone=' + mobile;
                    url += '&customerName=' + name;
                    url += '&productBitchNo=' + no;
                    $http.jsonp(url).success(function (data) {
                        OhFresh.hidePreloader();
                        $scope.orders = data;
                    }).error(function () {
                        OhFresh.hidePreloader();
                        OhFresh.addNotification({
                            title: "提示",
                            message: "系统连接失败！请稍后重试...",
                            hold: 3000
                        });
                    });
                };
                $scope.totalPrice = function (order) {
                    var total = 0;
                    if (order) {
                        angular.forEach(order.orderDetail, function (value) {
                            total += Number(value.productprice) * Number(value.count) + Number(value.freight);
                        });
                    }
                    return total;
                };
                $scope.ordersTotalPrice = function () {
                    var total = null;
                    if ($scope.status == 1 && $scope.orders) {
                        angular.forEach($scope.orders, function (value) {
                            total += $scope.totalPrice(value);
                        });
                    }
                    return total;
                };
                $scope.showDetails = function (order) {
                    $rootScope.$broadcast('back.change', {url: '#/order/list?token=' + new Date().getMilliseconds()});
                    $scope.index = 1;
                    $scope.currentOrder = order;
                };
                $scope.orderDealSubmit = function () {
                    OhFresh.showPreloader();
                    var url = Settings.orderDeal;
                    url += "&orderId=" + $scope.currentOrder.id;
                    url += "&userId=" + admin.id;
                    url += "&memo=" + $scope.currentOrder.memo;
                    var productinsId = "";
                    var freight = "";
                    var orderDetailId = "";
                    var productprice = "";
                    var count = "";
                    angular.forEach($scope.currentOrder.orderDetail, function (value) {
                        productinsId = value.productinsId;
                        freight = value.freight;
                        productprice = value.productprice;
                        count = value.count;
                        orderDetailId = value.id;
                    });
                    url += "&productinsId=" + productinsId;
                    url += "&freight=" + freight;
                    url += "&productprice=" + productprice;
                    url += "&count=" + count;
                    url += "&orderDetailId=" + orderDetailId;
                    $http.jsonp(url).success(function (data) {
                        OhFresh.hidePreloader();
                        if (data && data.result == 1) {
                            OhFresh.addNotification({
                                title: "提示",
                                message: "订单确认成功！",
                                hold: 2500
                            });
                            $scope.index = 0;
                            $scope.changeStatus(1);
                        }
                    }).error(function () {
                        OhFresh.hidePreloader();
                        OhFresh.addNotification({
                            title: "提示",
                            message: "系统连接失败！请稍后重试...",
                            hold: 3000
                        });
                    });
                }

            }
        ]);
});