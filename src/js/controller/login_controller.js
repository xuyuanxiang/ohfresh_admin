(function (angular, app, undefined) {
    app.controller('loginController', [
        '$rootScope', '$scope', '$location', 'localStorageService', 'adminService',
        function ($rootScope, $scope, $location, localStorageService, adminService) {
            var admin = angular.fromJson(localStorageService.get('admin'));

            if (admin && admin.id) {
                $location.url('/home');
                return;
            }

            $scope.doLogin = function () {
                if ($scope.loginForm.$valid) {
                    var codeReg = new RegExp('^[a-zA-Z]{1}([a-zA-Z0-9]|[._-]){5,19}$');
                    var mobileReg = new RegExp('^1[0-9]{10,11}$');
                    var admin = {
                        mobilephone: mobileReg.test($scope.account) ? $scope.account : '',
                        code: codeReg.test($scope.account) ? $scope.account : '',
                        password: $scope.password
                    };
                    adminService.login(admin).then(function (data) {
                        delete data.password;
                        localStorageService.set('admin', data);
                        alert('登录成功！');
                        $location.url('/home');
                    }, function (reason) {
                        alert(reason);
                    });
                }
            };
        }
    ]);
})(angular, OhFreshAdmin, undefined);
