'use strict';

angular.module('NgExpenses').controller('FriendModalCtrl', ['$scope', '$meteor', '$rootScope', '$mdDialog',
    function ($scope, $meteor, $rootScope, $mdDialog) {

        $scope.friends = $meteor.collection(Friends);
        $scope.$meteorSubscribe('userData');

        $scope.validateAndSaveFriend = function () {
            if($scope.friendForm.$valid && $rootScope.currentUser) {
                $scope.newFriend.createdby = $rootScope.currentUser._id;
                $scope.newFriend.createdat = new Date();

                $scope.friends.save($scope.newFriend).then(function(response) {
                    var matchingUser = Meteor.users.findOne({'services.google.email': $scope.newFriend.email});
                    if(matchingUser) {
                        if (validResponse(response)) {
                            var newFriendId = response[0]._id;
                            var gavatar = matchingUser.services.google.picture;
                            var userId = matchingUser._id;
                            $meteor.call('linkFriendToGoogle', newFriendId, userId, gavatar);
                        }
                    }
                    $scope.closeDialog();
                    $scope.newFriend = {};
                });
            }
        };

        function validResponse(response) {
            return response && response.length > 0;
        }

        $scope.closeDialog = $mdDialog.hide;
    }]);