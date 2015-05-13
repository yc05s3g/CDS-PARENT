/*global define*/
'use strict';

define(['angular',
	'uiRouter',
	'uiRouterStyles',
	'angularRoute',
	"ngStorage",
	'services/common/serviceLoader',
	'controllers/dashboardController',
	"controllers/headerController",
	"controllers/footerController",
	"directives/navDropdownDirective"
	], function (angular) {
    var app = angular.module('CDSDASHBOARD', ['ui.router','uiRouterStyles','ngRoute','ngStorage','serviceModule','controllerModule','directiveModule']);
    return app;
});
