'use strict';

angular.module('NgExpenses').controller('EventModalCtrl', ['$scope', '$meteor', '$rootScope', '$mdDialog',
    function ($scope, $meteor, $rootScope, $mdDialog) {

        $scope.events = $meteor.collection(Events);

        resetCurrent();

        $scope.validateAndSaveEvent = function () {
            if ($scope.eventForm.$valid && $rootScope.currentUser) {
                $scope.newEvent.createdby = $rootScope.currentUser._id;
                $scope.newEvent.createdat = new Date();
                $scope.newEvent.completed = false;

                $scope.events.save($scope.newEvent);
                $scope.closeDialog();
                resetCurrent();
            }
        };

        function resetCurrent() {
            $scope.newEvent = {
                date: new Date(),
                name: ''
            };
        }

        $scope.closeDialog = $mdDialog.hide;
    }]);