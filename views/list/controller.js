'use strict';

angular
    .module('weHousing.list', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/list', {
            templateUrl: 'views/list/view.html',
            controller: 'ListController'
        });
    }])
    .controller('ListController', ['$scope', '$http', '$location', 'roomService', function($scope, $http, $location, roomService) {
        var jsonUrl = 'http://yuxi4ever.ddns.net:8080/json';
        var sorter = '-popularity';
        var detailPath = '/detail';
        $scope.pageSize = 5;
        $scope.currentPage = 1;
        $scope.maxPage = 0;


        $http.get(jsonUrl).success(function saveRooms (json) {
            $scope.rooms = json.apartments.map(function fixImageUrl(room, index) {
                room.id = index + 1;
                room.image = '/WeHousing/app/assets/images/'+ room.image;
                return room;
            });
            $scope.maxPage = Math.ceil($scope.rooms.length / $scope.pageSize);
        })
        .error(function alertUser(error) {
            if (error) {
                alert('Error ' + error.status + ' connecting to the json server, please check your connection and try again.');
            } else {
                alert('Error connecting to the json server, please check your connection and try again.');
            }
        });

        $scope.openDetail = function(room) {
            roomService.setRoom(room);
            $location.path(detailPath);
        };

        $scope.select = function(sorter) {
            if (this.sorter === sorter) {
                this.sorter = null;
            } else {
                this.sorter = sorter;
            }
        };

        $scope.isSelected = function(sorter) {
            return this.sorter === sorter;
        };

        $scope.order = function() {
            return this.sorter;
        };

        $scope.highlight = function(id) {
            $scope.current = id;
        };

        $scope.isHighlighted = function(id) {
            return $scope.current === id;
        };

        $scope.prev = function() {
            $scope.currentPage--;
        };

        $scope.hasPrev = function() {
            return $scope.currentPage > 1;
        };

        $scope.next = function() {
            $scope.currentPage++;
        };

        $scope.hasNext = function() {
            return $scope.currentPage < $scope.maxPage;
        };

        $scope.getCurrentPage = function() {
            return $scope.currentPage;
        };
    }])
    .filter('showPage', function() {
        return function(input, currentPage, pageSize) {
            if (input) {
                var start = (currentPage - 1) * pageSize;
                if (input.length < start + pageSize) {
                    return input.slice(start);
                } else {
                    return input.slice(start, start + pageSize);
                }
            }
        }
    });