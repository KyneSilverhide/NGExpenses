'use strict';

angular.module('NgExpenses').controller('EventModalCtrl', ['$scope', '$meteor', '$rootScope', '$mdDialog',
    function ($scope, $meteor, $rootScope, $mdDialog) {

        $scope.events = $meteor.collection(Events).subscribe('events');

        resetCurrent();

        $scope.validateAndSaveEvent = function () {
            if ($scope.eventForm.$valid && $rootScope.currentUser) {
                $scope.newExpense.createdby = $rootScope.currentUser._id;
                $scope.newExpense.createdat = new Date();
                $scope.newExpense.completed = false;

                $scope.events.save($scope.newExpense);
                $scope.closeDialog();
                resetCurrent();
            }
        };

        function resetCurrent() {
            $scope.newExpense = {
                date: new Date(),
                name: ''
            };
        }

        $scope.closeDialog = $mdDialog.hide;
    }]);