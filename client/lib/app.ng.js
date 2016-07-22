angular.module('NgExpenses', [
    'angular-meteor',
    'ui.router',
    'ngMaterial',
    'angularUtils.directives.dirPagination',
    'accounts.ui',
    'ngLetterAvatar'
]);

onReady = function () {
    angular.bootstrap(document, ['NgExpenses']);
};

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}