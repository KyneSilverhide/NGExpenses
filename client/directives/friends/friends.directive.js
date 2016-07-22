'use strict';

angular.module('NgExpenses')
    .directive('friendlist', function () {
        return {
            restrict: 'AE',
            templateUrl: 'client/views/friends/friends.html',
            replace: true,
            controller: function ($scope, $meteor, $mdDialog) {

                $scope.page = 1;
                $scope.perPage = 6;
                $scope.sort = [['name', 1], ['email', 1]];

                $meteor.autorun($scope, function () {
                    $meteor.subscribe('friends', {
                        limit: parseInt($scope.getReactively('perPage')),
                        skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
                        sort: $scope.getReactively('sort')
                    }, $scope.getReactively('friendsearch')).then(function () {
                        $scope.matchingFriendsCount = $meteor.object(Counts, 'matchingFriends', false);
                    });
                });

                $scope.friends = $meteor.collection(function () {
                    return Friends.find({}, {sort: $scope.getReactively('sort')});
                });

                $scope.totalFriendsCount = $meteor.object(Counts, 'totalFriends', false);

                $scope.showFriendModal = function () {
                    $mdDialog.show({
                        controller: 'FriendModalCtrl',
                        parent: angular.element(document.body),
                        templateUrl: 'client/views/friends/friend.modal.html',
                        clickOutsideToClose: true
                    })
                };

                $scope.pageChanged = function (newPage) {
                    $scope.page = newPage;
                };
            }
        };
    });