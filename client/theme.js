'use strict';

angular.module('NgExpenses')
    .config(function ($mdThemingProvider, $mdIconProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('brown')
            .accentPalette('light-blue');

        var iconPath = '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

        $mdIconProvider
            .iconSet('social', iconPath + 'svg-sprite-social.svg')
            .iconSet('action', iconPath + 'svg-sprite-action.svg')
            .iconSet('communication', iconPath + 'svg-sprite-communication.svg')
            .iconSet('content', iconPath + 'svg-sprite-content.svg')
            .iconSet('toggle', iconPath + 'svg-sprite-toggle.svg')
            .iconSet('navigation', iconPath + 'svg-sprite-navigation.svg')
            .iconSet('image', iconPath + 'svg-sprite-image.svg')
            .icon('GLogo', 'images/Google_-G-_Logo.svg');
    });

