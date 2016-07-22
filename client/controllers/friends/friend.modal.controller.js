'use strict';

angular.module('NgExpenses').controller('FriendModalCtrl', ['$scope', '$meteor', '$rootScope', '$mdDialog',
    function ($scope, $meteor, $rootScope, $mdDialog) {

        $scope.friends = $meteor.collection(Friends).subscribe('friends');

        $scope.validateAndSaveFriend = function () {
            if($scope.friendForm.$valid && $rootScope.currentUser) {
                $scope.newFriend.createdby = $rootScope.currentUser._id;
                $scope.newFriend.createdat = new Date();
                $scope.friends.save($scope.newFriend);
                $scope.closeDialog();
                $scope.newFriend = {};
            }
        };

        $scope.closeDialog = $mdDialog.hide;
    }]);