'use strict';

angular.module('NgExpenses').controller('ExpenseModalCtrl', ['$scope', '$meteor', '$rootScope', '$mdDialog', 'event',
    function ($scope, $meteor, $rootScope, $mdDialog, event) {

        $scope.event = event;
        $scope.friends = $meteor.collection(Friends);

        resetCurrent();

        $scope.validateAndSaveExpense = function () {
            if ($scope.expenseForm.$valid && $rootScope.currentUser) {

                $scope.events = $meteor.collection(Events);
                $scope.newExpense.createdby = $rootScope.currentUser._id;
                $scope.newExpense.createdat = new Date();

                if(!$scope.event.expenses) {
                    $scope.event.expenses = [];
                }
                $scope.event.expenses.push($scope.newExpense);
                $scope.event.save();

                $scope.closeDialog();
                resetCurrent();
            }
        };

        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
        };

        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.closeDialog = $mdDialog.hide;

        function resetCurrent() {
            $scope.newExpense = {
                friends: [],
                name: '',
                amount: ''
            };
            var meAsFriend = Friends.findOne({'userId': $rootScope.currentUser._id});
            if(meAsFriend) {
                $scope.newExpense.friends.push(meAsFriend);
            }
        }
    }]);