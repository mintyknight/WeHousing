'use strict';

angular
    .module('weHousing.detail', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/detail', {
            templateUrl: 'views/detail/view.html',
            controller: 'DetailController'
        });
    }])
    .controller('DetailController', ['$scope', 'roomService', function($scope, roomService) {
        $scope.room = roomService.getRoom();
    }]);