'use strict';

angular.module('NgExpenses')

    .config(function ($urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    }).run(['$rootScope', '$state', function ($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        switch (error) {
            case 'AUTH_REQUIRED':
            case 'FORBIDDEN':
            case 'UNAUTHORIZED':
                $state.go('login');
                break;
        }
    });
}]);

angular.module('NgExpenses')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/',
                templateUrl: 'client/views/dashboard/dashboard.html',
                resolve: {
                    "currentUser": ["$meteor", function ($meteor) {
                        return $meteor.requireUser();
                    }]
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'client/views/users/login.html',
                controller: 'LoginCtrl'
            })            
            .state('logout', {
                url: '/logout',
                resolve: {
                    "logout": ['$meteor', '$state', function ($meteor, $state) {
                        return $meteor.logout().then(function () {
                            $state.go('login');
                        }, function (err) {
                            console.log('logout error - ', err);
                        });
                    }]
                }
            });
    }]);