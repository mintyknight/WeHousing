'use strict';

angular
    .module('weHousing', [
        'ngRoute',
        'weHousing.list',
        'weHousing.detail'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/list'});
    }])
    .service('roomService', function() {
        this.room = null;
        this.setRoom = function(room) {
            this.room = room;
        }
        this.getRoom = function() {
            return this.room;
        }
    });
