(function (w, angular, undefined) {
    w.OhFreshAdmin = angular.module('ohFreshAdmin', [
        'ngRoute', 'ngTouch', 'ohFreshAdmin.template', 'LocalStorageModule', 'angularMoment'
    ]).config(['localStorageServiceProvider',
        function (localStorageServiceProvider) {
            //离线存储key前缀
            localStorageServiceProvider.setPrefix('ohFreshAdmin');
        }
    ]);
})(window, angular, undefined);
