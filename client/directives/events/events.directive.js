'use strict';

angular.module('NgExpenses')
    .directive('eventlist', function () {
        return {
            restrict: 'AE',
            templateUrl: 'client/views/events/events.html',
            replace: true,
            controller: function ($scope, $meteor, $mdDialog) {

                $scope.page = 1;
                $scope.perPage = 6;
                $scope.sort = [['createdat', 1], ['name', 1]];

                $meteor.autorun($scope, function () {
                    $meteor.subscribe('events', {
                        limit: parseInt($scope.getReactively('perPage')),
                        skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
                        sort: $scope.getReactively('sort')
                    }, $scope.getReactively('eventsearch')).then(function () {
                        $scope.matchingEventsCount = $meteor.object(Counts, 'matchingEvents', false);
                    });
                });

                $scope.events = $meteor.collection(function () {
                    return Events.find({}, {sort: $scope.getReactively('sort')});
                });

                $scope.totalEventsCount = $meteor.object(Counts, 'totalEvents', false);

                // $scope.showFriendModal = function () {
                //     $mdDialog.show({
                //         controller: 'FriendModalCtrl',
                //         parent: angular.element(document.body),
                //         templateUrl: 'client/views/friends/friend.modal.html',
                //         clickOutsideToClose: true
                //     })
                // };

                $scope.pageChanged = function (newPage) {
                    console("PAGE CHANGED TO " + newPage);
                    $scope.page = newPage;
                };
            }
        };
    });