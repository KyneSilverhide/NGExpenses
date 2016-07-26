'use strict';

angular.module('NgExpenses')
    .directive('eventlist', function () {
        return {
            restrict: 'AE',
            templateUrl: 'client/views/events/events.html',
            replace: true,
            scope: {},
            controller: function ($scope, $meteor, $mdDialog) {

                $scope.ignoreCompleted = false;
                $scope.eventsearch = '';
                $scope.sort = [['date', 'desc'], ['name', 'asc']];

                $meteor.autorun($scope, function () {
                    $meteor.subscribe('events', {
                        sort: $scope.sort
                    }, $scope.getReactively('eventsearch'), $scope.getReactively('ignoreCompleted')).then(function () {
                        $scope.matchingEventsCount = $meteor.object(Counts, 'matchingEvents', false);
                    });
                });

                $scope.myevents = $meteor.collection(function () {
                    return Events.find({});
                });

                $scope.totalEventsCount = $meteor.object(Counts, 'totalEvents', false);

                $scope.showEventModal = function () {
                    $mdDialog.show({
                        controller: 'EventModalCtrl',
                        parent: angular.element(document.body),
                        templateUrl: 'client/views/events/event.modal.html',
                        clickOutsideToClose: true
                    })
                };

                $scope.showExpenseModal = function (eventId) {
                    var currentEvent = $meteor.object(Events, eventId);
                    $mdDialog.show({
                        controller: 'ExpenseModalCtrl',
                        parent: angular.element(document.body),
                        templateUrl: 'client/views/events/expense.modal.html',
                        clickOutsideToClose: true,
                        locals: {event: currentEvent}
                    })
                };

                $scope.markEventCompleted = function (clickEvent, eventId) {
                    var confirm = $mdDialog.confirm("TEST")
                        .title('Are you sure you want to complete this event?')
                        .textContent('All expenses inside this event will be considered paid')
                        .targetEvent(clickEvent)
                        .ok('Yes')
                        .cancel('Cancel');
                    $mdDialog.show(confirm).then(function () {
                        $meteor.call('markCompleted', eventId);
                    });
                };

                $scope.getTotalAmount = function (event) {
                    var total = 0;
                    angular.forEach(event.expenses, function (value) {
                        total += value.amount;
                    });
                    return total;
                }
            }
        };
    });