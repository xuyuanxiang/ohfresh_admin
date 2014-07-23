define(['../application',
    '../settings'
], function (OhFresh, Settings) {
    angular.module('ohFresh.admin.controllers', ['ngCookies', 'ngRoute'])
        .controller('LoginCtrl', ['$scope', '$http', '$location', '$cookieStore', '$rootScope', '$routeParams',
            function ($scope, $http, $location, $cookieStore, $rootScope, $routeParams) {
                $scope.admin = $cookieStore.get('admin');
                var currentId = $routeParams.id;
                if ($scope.admin && currentId) {
                    $location.url('/order/list?customerId=' + currentId);
                    return;
                }
                $rootScope.$broadcast('back.change', null);
                $scope.loginFormSubmit = function () {
                    if ($scope.loginForm.$valid) {
                        var codeReg = new RegExp('^[a-zA-Z]{1}([a-zA-Z0-9]|[._-]){5,19}$');
                        var code = '';
                        if (codeReg.test($scope.account)) {
                            code = $scope.account;
                        }
                        var mobileReg = new RegExp('^1[0-9]{10,11}$');
                        var mobile = '';
                        if (mobileReg.test($scope.account)) {
                            mobile = $scope.account;
                        }
                        var url = Settings.loginUrl + "&mobilephone=" + mobile + "&password=" + $scope.password + "&code=" + code;
                        OhFresh.showIndicator();
                        $http.jsonp(url).success(
                            function (data) {
                                OhFresh.hideIndicator();
                                if (data) {
                                    var message = '';
                                    switch (data.status) {
                                        case 0:
                                            message = '登录失败，账号未激活！';
                                            break;
                                        case -1:
                                            message = '登录失败，账号已注销！';
                                            break;
                                        case 1:
                                            message = '登录成功！';
                                            break;
                                        default:
                                            message = '登录失败，账号不存在！';
                                            break;
                                    }
                                    OhFresh.addNotification({
                                        title: '提示',
                                        message: message,
                                        hold: 3000
                                    });
                                    if ('登录成功！' === message) {
                                        data.password = '';
                                        $cookieStore.put('admin', data);
                                        if (currentId) {
                                            $location.url('/order/list?customerId=' + currentId);
                                        } else {
                                            $location.url('/home');
                                        }
                                    }
                                } else {
                                    OhFresh.addNotification({
                                        title: '提示',
                                        message: '登录失败，账号或密码错误！',
                                        hold: 3000
                                    });
                                }
                            }
                        ).error(function () {
                                OhFresh.addNotification({
                                    title: "提示",
                                    message: "系统连接失败！请稍后重试...",
                                    hold: 3000
                                });
                                OhFresh.hideIndicator();
                            });
                    }
                }
            }
        ]);
});
