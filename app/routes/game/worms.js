'use strict';

// export function for listening to the socket
module.exports = function (socket, namespace) {

    console.log(namespace);

    socket.on('disconnect', function () {
        console.log('leave worms');
    });

};