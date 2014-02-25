'use strict';

var userNames = (function () {
    var names = {};

    var claim = function (name) {
        if (!name || names[name]) {
            return false;
        } else {
            names[name] = true;
            return true;
        }
    };

    // find the lowest unused "guest" name and claim it
    var add = function (userName) {
        var name;

        do {
            name = userName;
        } while (!claim(name));
    };

    // serialize claimed names as an array
    var get = function () {
        var res = [];
        for (var user in names) {
            res.push(user);
        }

        return res;
    };

    var free = function (name) {
        if (names[name]) {
            delete names[name];
        }
    };

    return {
        claim: claim,
        free: free,
        get: get,
        add: add
    };
}());


// export function for listening to the socket
module.exports = function (socket) {
    var name;

    // broadcast a user's message to other users
    socket.on('user:join', function (data) {
        userNames.add(data.name);
        name = data.name;
        socket.broadcast.emit('user:join', {
            name: data.name
        });
    });

    socket.on('send:message', function (data) {
        socket.broadcast.emit('send:message', {
            user: name,
            text: data.message
        });
    });

    // clean up when a user leaves, and broadcast it to other users
    socket.on('disconnect', function () {
        socket.broadcast.emit('user:left', {
            name: name
        });
        userNames.free(name);
    });

};