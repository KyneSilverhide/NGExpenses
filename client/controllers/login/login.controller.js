"use strict";

angular.module("NgExpenses").controller("LoginCtrl", ['$meteor', '$state', '$scope',
    function ($meteor, $state, $scope) {

        $scope.error = '';

        $scope.login = function () {
            $meteor.loginWithGoogle().then(
                function () {
                    var user = Meteor.user();
                    var email = user.services.google.email;
                    var avatarURL = user.services.google.picture;
                    $meteor.call('linkMatchingFriendsToGoogle', email, avatarURL);

                    $state.go('dashboard');
                },
                function (err) {
                    $scope.error = 'Login error - ' + err;
                }
            );
        };
    }
]);