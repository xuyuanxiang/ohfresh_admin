(function (angular, app, Settings, undefined) {
    app.factory('orderService', ['$http', '$q',
        function ($http, $q) {
            var getByConditions = function (conditions) {
                var deffered = $q.defer();
                if (conditions) {
                    var url = [Settings.orderQuery];
                    if (conditions.status)
                        url.push('&status=' + conditions.status);
                    if (conditions.userId)
                        url.push('&userId=' + conditions.userId);
                    if (conditions.customerId)
                        url.push('&customerId=' + conditions.customerId);
                    if (conditions.mobilephone)
                        url.push('&mobilephone=' + conditions.mobilephone);
                    if (conditions.customerName)
                        url.push('&customerName=' + conditions.customerName);
                    $http.jsonp(url.join('')).success(function (data) {
                        deffered.resolve(data);
                    }).error(function () {
                        deffered.reject('服务器连接失败！请稍后重试。。。');
                    });
                }
                return deffered.promise;
            };

            return {
                getByConditions: getByConditions
            }
        }
    ]);

})(angular, OhFreshAdmin, Settings, undefined);
