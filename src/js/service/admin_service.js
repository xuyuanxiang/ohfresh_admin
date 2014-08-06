(function (angular, app, Settings, undefined) {
    app.factory('adminService', ['$http', '$q',
        function ($http, $q) {
            var login = function (admin) {
                var deferred = $q.defer();
                if (admin) {
                    var url = [Settings.loginUrl];
                    url.push("&mobilephone=" + (admin.mobilephone ? admin.mobilephone : ''));
                    url.push("&password=" + (admin.password ? admin.password : ''));
                    url.push("&code=" + (admin.code ? admin.code : ''));
                    $http.jsonp(url.join('')).success(function (data) {
                        deferred.resolve(data);
                    }).error(function () {
                        deferred.reject('服务器连接失败！请稍后重试。。。');
                    });
                }
                return deferred.promise;
            };

            return {
                login: login
            }
        }
    ]);
})(angular, OhFreshAdmin, Settings, undefined);
