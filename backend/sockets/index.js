module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('New client connected',socket.id);

    socket.emit('test', { test: 'test' });
    socket.on('fromclient', (d) => {
      // console.log('fromclient', d);
    });

    socket.on('disconnect', () => {
      // console.log('Client disconnected');
    });
  });
};
