'use strict';

angular.module('mean.chat').controller('ChatController', ['$scope', '$routeParams', '$location', 'Global', 'Socket', function ($scope, $routeParams, $location, Global, Socket) {
    $scope.global = Global;
    $scope.messages = [];
    $scope.users = [];
    $scope.romms = [];

    //enter to lobby
    $scope.enter = function(){
        Socket.emit('user:join', {
            name: Global.user.username,
            room: 'lobby'
        });
    };

    $scope.createNewRoom = function(){
        Socket.emit('user:createNewRoom', {
            name: Global.user.username,
            room: this.room_name
        },function(data){
            $location.path('chat/' + data.room_id);
        });


        this.title = '';
        this.content = '';
    };

    //join to room
    $scope.join = function(){
        Socket.emit('user:join', {
            name: Global.user.username
        });
    };


    // Socket listeners
    // ================
    Socket.on('send:message', function (data) {
        console.log('send:message');
        console.log(data);
        $scope.messages.push(data);
    });

    Socket.on('update:userList', function (data) {
        $scope.users = [];
        for (var i = data.users.length - 1; i >= 0; i--) {
            $scope.users.push({
                name: data.users[i]
            });
        }
    });

    Socket.on('update:roomList', function (data) {
        $scope.rooms = [];
        for (var i = data.rooms.length - 1; i >= 0; i--) {
            $scope.rooms.push({
                name: data.rooms[i]
            });
        }
    });

    Socket.on('user:join', function (data) {
        $scope.users.push({
            name: data.name
        });
        $scope.messages.push({
            user: 'chatroom',
            text: 'User ' + data.name + ' has joined.'
        });
    });

    // add a message to the conversation when a user disconnects or leaves the room
    Socket.on('user:left', function (data) {
        $scope.messages.push({
            user: 'chatroom',
            text: 'User ' + data.name + ' has left.'
        });
    });


    $scope.sendMessage = function(){
        Socket.emit('send:message', {
            message: $scope.message
        });

        $scope.messages.push({
            user: Global.user.username,
            text: $scope.message
        });

        $scope.message = '';
    };

}]);