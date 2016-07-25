'use strict';

angular.module('NgExpenses')
    .directive('friendlist', function () {
        return {
            restrict: 'AE',
            templateUrl: 'client/views/friends/friends.html',
            replace: true,
            scope: {},
            controller: function ($scope, $meteor, $mdDialog) {

                $scope.sort = [['name', 1], ['email', 1]];

                $meteor.autorun($scope, function () {
                    $meteor.subscribe('friends', {
                        sort: $scope.getReactively('sort')
                    }, $scope.getReactively('friendsearch')).then(function () {
                        $scope.matchingFriendsCount = $meteor.object(Counts, 'matchingFriends', false);
                    });
                    $meteor.subscribe('events', {
                        sort: $scope.getReactively('sort')
                    }, $scope.getReactively('eventsearch'), $scope.getReactively('ignoreCompleted')).then(function () {
                        $scope.matchingEventsCount = $meteor.object(Counts, 'matchingEvents', false);
                    });
                });

                $scope.friends = $meteor.collection(function () {
                    return Friends.find({}, {sort: $scope.getReactively('sort')});
                });

                $scope.events = $meteor.collection(function () {
                    return Events.find({}, {sort: $scope.getReactively('sort')});
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

                $scope.deleteFriend = function(friend) {
                    // if(!$scope.userIsFriend(friend)) {
                        var confirm = $mdDialog.confirm("TEST")
                            .title('Are you sure you want to delete this friend?')
                            .textContent('All expenses linked to its account will be lost')
                            .ok('Delete')
                            .cancel('Cancel');
                        $mdDialog.show(confirm).then(function () {
                            $scope.friends.remove(friend);
                        });
                    // }
                };

                $scope.userIsFriend = function(friend) {
                    return friend.userId && Meteor.userId() === friend.userId;
                };

                $scope.getDueExpense = function(friend) {
                    var totalOwed = 0;
                    if(!$scope.userIsFriend(friend)) {
                        angular.forEach($scope.events, function (event) {
                            angular.forEach(event.expenses, function (expense) {
                                var friendInExpense = isInExpense(expense, friend);
                                if(friendInExpense) {
                                    var ratio = expense.friends.length;
                                    totalOwed += expense.amount / ratio;
                                }
                            });
                        });
                    }
                    return totalOwed;
                };

                function isInExpense(expense, targetFriend) {
                    var found = false;
                    angular.forEach(expense.friends, function (curFriend) {
                        if(curFriend.email === targetFriend.email) {
                            found = true;
                        }
                    });
                    return found;
                }
            }
        };
    });