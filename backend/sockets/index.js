const height = 30;
const width = 30;
const randomPosition = (width, height) => {
  const position = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height)
  };
  return position;
};

module.exports = function(io) {
  io.on('connection', (socket) => {
    // console.log('New client connected',socket.id);

    socket.on('room', function(room) {
      socket.join(room);
    });

    // socket.emit('newfood', { newfood: 'newfood' });
    // socket.emit('newsnake', { newsnake: 'newsnake' });
    // socket.emit('getsnakes', { getsnakes: 'getsnakes' });

    // socket.emit('newGameStarted', { position: [{ x: 0, y: 0 }] });

    // setTimeout(() => {
    //   socket.emit('gameJoined', { position: [{ x: 100, y: 100 }] });
    // }, 4000);

    socket.on('gameJoined', (data) => {
      io.sockets.in(data.gameId).emit('gameJoined', {
        gameId: data.gameId,
        playerId: data.playerId,
        position: [{ x: 0, y: 0 }],
        remotePosition: [{ x: 10, y: 10 }],
        gameDetails: data.gameDetails
      });
    });

    socket.on('newGameStarted', (d) => {
      // console.log('newGameStarted', d);
    });

    socket.on('moved', (data) => {
      // console.table(['moved', data.playerId, data.position]);
      io.sockets.in(data.gameId).emit('moved', data);
    });

    socket.on('gameover', (data) => {
      // console.table(['moved', data.playerId, data.position]);
      io.sockets.in(data.gameId).emit('gameover', data);
    });

    socket.on('newFood', (data) => {
      //  gameId, playerId, position
      const foodPosition = randomPosition(width, height);
      io.sockets.in(data.gameId).emit('newFood', { position: foodPosition });

      const gameDetails = data.gameDetails;
      const updateScore = data.updateScore;

      const newGameDetails = gameDetails.map((detail) => {
        const newDetail = {
          score: detail.score,
          player_id: detail.player_id
        };
        if (detail.player_id === data.playerId && updateScore === true) {
          newDetail.score = detail.score + 1;
          newDetail.player_id = detail.player_id;
        }
        return newDetail;
      });

      io.sockets.in(data.gameId).emit('score', { gameDetails: newGameDetails });
    });

    socket.on('disconnect', () => {
      // console.log('Client disconnected');
    });
  });
};
