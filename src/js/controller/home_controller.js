(function (angular, app, undefined) {
    app.controller('homeController', [
        '$rootScope', '$scope', '$location', 'localStorageService',
        function ($rootScope, $scope, $location, localStorageService) {
            var admin = $scope.admin = angular.fromJson(localStorageService.get('admin'));
            if (!admin || !admin.id) {
                $location.url('/login');
                return;
            }

        }
    ]);

})(angular, OhFreshAdmin, undefined);
