'use strict';

angular.module('NgExpenses')
    .directive('toolbar', function () {
        return {
            restrict: 'AE',
            templateUrl: 'client/views/toolbar/toolbar.html',
            replace: true,
            controller: function ($scope) {
                $scope.$meteorSubscribe('userData');
            }
        };
    });