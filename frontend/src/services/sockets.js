import socketIOClient from 'socket.io-client';
import { BASESERVERURL } from '../constants';

export default class Socket {
  constructor() {
    this.socket = socketIOClient(BASESERVERURL);
  }

  gameJoined({ gameId, gameDetails, position }) {
    this.socket.emit('gameJoined', { gameId, gameDetails, position });
  }

  newGameStarted({ gameId, gameDetails, position }) {
    this.socket.emit('newGameStarted', { gameId, gameDetails, position });
    // this.socket.to(gameId).emit('newGameStarted', { gameId, gameDetails, position });
  }

  getSocketId() {
    return this.socket.id;
  }

  newSnake(mySnake) {
    this.socket.emit('newsnake', mySnake);
  }

  getSnakes() {
    this.socket.emit('getsnakes');
  }

  initSocketEvents() {
    let that = this;

    this.socket.on('connect', function() {
      // that.mySnake.id = this.socket.id;
      console.log('connect');
    });

    // when a new snake enter
    this.socket.on('newsnake', function(snake) {
      console.log('newsnake');
      // let newSnake = new Snake(snake.id, snake.body[0].x, snake.body[0].y, snake.speed, snake.width, snake.height);
      // that.snakes.push(newSnake);
    });

    this.socket.on('getsnakes', function(snakes) {
      console.log('getsnakes');
      // snakes.forEach((snake) => {
      //   // let newSnake = new Snake(snake.id, snake.body[0].x, snake.body[0].y, snake.speed, snake.width, snake.height);
      //   // that.snakes.push(newSnake);
      // });
      // if (snakes.length === 0) {
      //   this.socket.emit('newfood', that.food);
      // } else {
      //   this.socket.emit('getfood');
      // }
    });

    this.socket.on('removesnake', function(snakeId) {
      // console.log('remove ' + snakeId);
      // for (let i = 0; i < that.snakes.length; i++) {
      //   console.log(that.snakes[i].id);
      //   if (that.snakes[i].id == snakeId) {
      //     console.log('removed: ' + snakeId);
      //     that.snakes.splice(i, 1);
      //     break;
      //   }
      // }
    });

    this.socket.on('moved', function(snake) {
      console.log(snake);
      // for (let i = 0; i < that.snakes.length; i++) {
      //   if (snake.id == that.snakes[i].id) {
      //     that.snakes[i].body = snake.body;
      //   }
      // }
    });

    this.socket.on('newfood', function(food) {
      console.log(food);
      // let newFood = new Food();
      // newFood.x = food.x;
      // newFood.y = food.y;
      // that.food = newFood;
    });
  }
}
